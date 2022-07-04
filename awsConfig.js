"use strict";


const awsCredential = () =>
   ({ apiVersion       : "2012-08-10"
    , accessKeyId      : "AKIAY763CNP4FFCTGJ56"
    , secretAccessKey  : "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"
    , region           : "us-east-1"
    , signatureVersion : "v4"
    })

const awsCredentialConfig = () =>
   ({ accessKeyId      : "AKIAY763CNP4FFCTGJ56"
    , secretAccessKey  : "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"
    , region           : "us-east-1"
    , signatureVersion : "v4"
    })


module.exports =
    { awsCredential, awsCredentialConfig }
