# xchangerate-front-end dockerfile
# centos, nginx, nodejs
# @author Shaojiang Cai shaojiang@toptal.com
# @date 23/07/2017

FROM joycoding/centos-nginx-nodejs

# Create app directory
RUN mkdir -p /usr/src/xchangerate-front-end
WORKDIR /usr/src/xchangerate-front-end

# Install app dependencies
COPY package.json /usr/src/xchangerate-front-end/
# RUN npm install

# Bundle app source
COPY . /usr/src/xchangerate-front-end
# RUN npm run build

# Softlink the nginx configuration file
RUN ln -s /usr/src/xchangerate-front-end/configs/Docker.nginx.conf /etc/nginx/conf.d/xchangerate-front-end.conf
RUN ln -s /usr/src/xchangerate-front-end/configs/nginx.gzip.conf /etc/nginx/conf.d/gzip.conf

EXPOSE 8000
# Run this script when starting a new docker container
CMD ["sh", "configs/deploy.sh"]
