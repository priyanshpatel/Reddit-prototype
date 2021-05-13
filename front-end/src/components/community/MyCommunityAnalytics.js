import * as React from "react";
import { Chart } from "react-google-charts";
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";
import { Card, Container, Dropdown, Form, ListGroup, Row, Col } from 'react-bootstrap';
import Navbar from "../Navbar/Navbar";

const data = [
  ["Year", "Visitations", { role: "style" }],
  ["2010", 10, `color: ${getRandomColor()}`],
  ["2020", 14, `color: ${getRandomColor()}`],
  ["2030", 16, `color: ${getRandomColor()}`],
  ["2040", 22, `color: ${getRandomColor()}`],
  [
    "2050",
    28,
    `color: ${getRandomColor()}`
  ]
];
const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class MyCommunityAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfUsers: null,
      numberOfPosts: null,
      numberOfVotes: null,
    };
  }
  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    let queryUrl = `${BACKEND_URL}:${BACKEND_PORT}/user/myCommunityAnalytics`;
    console.log("Query URL", queryUrl);
    const response = await axios.get(queryUrl);
    console.log("Response ", JSON.stringify(response));
    let myAnalyticsData = response.data;
    console.log("Modified data 1", myAnalyticsData);
    let modifiedDataForUsers = [];
    let modifiedDataForPosts = [];
    let modifiedDataForVotes = [];

    modifiedDataForUsers.push(["Community", "Number Of Users", { role: "style" }]);
    modifiedDataForPosts.push(["Community", "Number Of Posts", { role: "style" }]);
    modifiedDataForVotes.push(["Community", "Number Of Votes", { role: "style" }]);
    if (myAnalyticsData) {
      for (var i = 0; i < myAnalyticsData.length; i++) {
        let name = myAnalyticsData[i].communityName;
        let numberOfUsers = myAnalyticsData[i].numberOfUsers;
        let numberOfPosts = myAnalyticsData[i].numberOfPosts;
        let numberOfVotes = myAnalyticsData[i].numberOfVotes;
        modifiedDataForUsers.push([name, numberOfUsers, `color: ${getRandomColor()}`])
        modifiedDataForPosts.push([name, numberOfPosts, `color: ${getRandomColor()}`])
        modifiedDataForVotes.push([name, numberOfVotes, `color: ${getRandomColor()}`])
      }
      console.log("Modified data Users ", modifiedDataForUsers);
      console.log("Modified data Posts ", modifiedDataForPosts);
      this.setState({
        numberOfUsers: modifiedDataForUsers,
        numberOfPosts: modifiedDataForPosts,
        numberOfVotes: modifiedDataForVotes

      })
    }

  }

  render() {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <Row>
          <Col lg={6}>
            <div className="App">
              <Chart chartType="ColumnChart" width="100%" height="400px" data={this.state.numberOfUsers} options={{ is3D: true }} />
            </div>
          </Col>
          <Col lg={6}>
            <div className="App">
              <Chart chartType="ColumnChart" width="100%" height="400px" data={this.state.numberOfPosts} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <div className="App">
              <Chart chartType="ColumnChart" width="100%" height="400px" data={this.state.numberOfVotes} />
            </div>
          </Col>
          <Col lg={6}>
            <div className="App">
              <Chart chartType="PieChart" width="100%" height="400px" data={this.state.numberOfPosts} options={pieOptions} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
export default MyCommunityAnalytics;