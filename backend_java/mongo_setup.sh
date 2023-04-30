#!/bin/bash

DB_STATS="0"

until [[ $DB_STATS =~ "1" ]]
do
    sleep 5
    DB_STATS="$(echo 'db.stats().ok' | mongo localhost:27017 --quiet)"
done

mongo --host localhost:27017 <<EOF
  var cfg = {
    "_id": "rs0",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo1:27017",
        "priority": 2
      }
    ]
  };
  rs.initiate(cfg);
EOF