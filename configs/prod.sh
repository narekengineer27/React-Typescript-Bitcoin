#!/usr/bin/env bash

# container on terminal, Ctrl+C to terminate
docker run -it -p 8001:8000 --name xchangerate-front-end -v /home/shaojiang/Projects/xchangerate/xchangerate-prod/frontend:/usr/src/xchangerate-front-end joycoding/xchangerate-front-end

# container detached, need `docker rm -f xchangerate-front-end` to terminate
docker run -d -p 8001:8000 --name xchangerate-front-end -v /shaojiang/joy/Projects/xchangerate/xchangerate-prod/frontend:/usr/src/xchangerate-front-end joycoding/xchangerate-front-end

# no volumn. should build beforehand.
docker run -it -p 8001:8000 --name xchangerate-front-end joycoding/xchangerate-front-end
