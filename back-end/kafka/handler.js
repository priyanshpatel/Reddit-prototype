export function kafka_response_handler(res, err, results, successHandler) {
  //console.log('errX ', err);
  //console.log('results ', results);
  if (err) {
    console.log("Inside error kafka");
    console.log(err);
    return res.status(500).send(err);
  }
  if (results.err) {
    console.log("Inside result error");
    console.log(results.err);
    return res.status(results.err.status).send(results.err.data);
  }

  return successHandler(results.res);
}

export function kafka_default_response_handler(res, err, results) {
  return kafka_response_handler(res,err,results,results =>res.status(results.status).send(results.data));
}