#!/bin/bash

nohup bash /scripts/mongo_setup.sh &
mongod --bind_ip_all --replSet rs0