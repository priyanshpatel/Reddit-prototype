const InvitationModel = require("../models/InvitationModel");
const CommunityModel = require("../models/CommunityModel");
const UserModel = require("../models/UsersModel");
const config = require("../config/config");
const ObjectId = require("mongodb").ObjectID;

export const bulkInviteUsersToCommunity = async (req, callback) => {
  // Check whether the community is valid or not and the logged in user should be its creator
  const community = await CommunityModel.findById(req.body.community_id);
  if (!community || !community.creator.equals(req.user._id)) {
    callback(null, {
      errorMessage: ["Select a valid commnuity"],
      success: false,
    });
    return;
  }
  // Check whether the set of users is unique or not
  if (req.body.users.length !== Array.from(new Set(req.body.users)).length) {
    callback(null, {
      errorMessage: ["Select a valid set of users"],
      success: false,
    });
    return;
  }
  // Check the status of users in the set if the user is already a member or has already requested
  if (!isStatusOfSelectedUsersValid(community.members, req.body.users)) {
    callback(null, {
      errorMessage: [
        "Select users who haven't been invited, who haven't requested to join the community and those who are not a member of the community",
      ],
      success: false,
    });
    return;
  }
  // Generate data which we should add in the invites table
  const inviteData = req.body.users.map((id) => {
    return {
      user: id,
      community: req.body.community_id,
    };
  });
  // Add entries in the invitation table
  await InvitationModel.insertMany(inviteData);

  // Generate data which we should add in the community instance
  const communityMembershipData = req.body.users.map((id) => {
    return { _id: id, communityJoinStatus: config.INVITED_TO_JOIN_COMMUNITY };
  });

  // Update communities instance
  community.members = community.members.concat(communityMembershipData);
  await community.save();

  callback(null, {
    message: "Successfully sent invites to all the users!",
    success: true,
  });
};

export const getInviteStatus = async (req, callback) => {
  const pageSize =
    req.query.pageSize || config.defaultPageSizeMyCommunityInviteStatusPage;
  const pageNumber = req.query.pageNumber;
  const community_id = req.params.community_id;

  // Check whether the community and the creator is valid
  const community = await CommunityModel.findById(community_id);

  if (!community || !community.creator.equals(req.user._id)) {
    callback(null, {
      errorMessage: ["Select a valid commnuity"],
      success: false,
    });
    return;
  }

  // Generate a paginated response
  const customLabels = {
    totalDocs: "numberOfInvites",
    docs: "invites",
    limit: "pageSize",
    page: "pageNumber",
  };

  const paginationOptions = {
    page: pageNumber,
    limit: pageSize,
    customLabels,
    populate: "user",
    select: {
      status: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  };

  // Send Paginated response without search keyword
  console.log(await InvitationModel.find());
  const paginatedResponse = await InvitationModel.paginate(
    {
      community: community_id,
    },
    paginationOptions
  );

  callback(null, { paginatedResponse, success: true });
};

export const getInvitations = async (req, callback) => {
  const notifications = await InvitationModel.find(
    {
      user: req.user._id,
      status: config.USER_PENDING_INVITE,
    },
    "status community createdAt updatedAt"
  ).populate("community", "communityName communityAvatar description");

  callback(null, { notifications, success: true });
};

export const updateInviteStatus = async (req, callback) => {
  // Initialize variables needed
  const status = req.body.status;
  const invititation_id = req.body.invitation_id;

  // Check whether the invite is valid or not
  const invitation = await InvitationModel.findOne({
    _id: invititation_id,
    user: req.user._id,
    status: config.USER_PENDING_INVITE,
  });
  if (!invitation) {
    callback(null, { errorMessage: ["Select a valid invite"], success: false });
    return;
  }

  // Update the invite
  invitation.status = status;

  // Find and Update the community membership array
  const community = await CommunityModel.findById(
    invitation.community,
    "members"
  );
  const position = community.members.findIndex((membership) => {
    return (
      ObjectId(membership._id).equals(ObjectId(req.user._id)) &&
      membership.communityJoinStatus === config.INVITED_TO_JOIN_COMMUNITY
    );
  });

  // If we cannot find the element
  if (position === -1) {
    callback(null, {
      errorMessage: ["Unexpected Error occured"],
      success: false,
    });
    return;
  }
  // If we can find the element
  if (status === config.USER_ACCEPTED_INVITE) {
    community.members[position].communityJoinStatus =
      config.ACCEPTED_REQUEST_TO_JOIN_COMMUNITY;
    // Find and update user membership array
    await UserModel.updateOne(
      { _id: req.user._id },
      { $addToSet: { memberships: invitation.community } }
    );
  } else if (status === config.USER_REJECTED_INVITE) {
    // Remove the embedded membership object if the request is rejected
    community.members.splice(position, 1);
  }
  // Save all the instances
  await invitation.save();
  await community.save();
  callback(null, {
    message: "Successfully updated the community status",
    success: true,
  });
};

// HELPER FUNCTIONS

const isStatusOfSelectedUsersValid = (memberships, users) => {
  const statusList = [
    config.ACCEPTED_REQUEST_TO_JOIN_COMMUNITY,
    config.REQUESTED_TO_JOIN_COMMUNITY,
    config.INVITED_TO_JOIN_COMMUNITY,
  ];
  for (let index = 0; index < users.length; index++) {
    let position = memberships.findIndex((membership) => {
      return (
        ObjectId(membership._id).equals(ObjectId(users[index])) &&
        statusList.includes(membership.communityJoinStatus)
      );
    });
    if (position !== -1) return false;
  }
  return true;
};
