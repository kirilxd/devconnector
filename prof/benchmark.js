'use strict'

const autocannon = require('autocannon')

autocannon(
    {
        url: 'http://localhost:5000',
        connections: 10,
        pipelining: 1,
        duration: 10,
    },
    console.log
)
