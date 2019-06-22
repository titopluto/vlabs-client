# Get node from source TODO: get spectifc verstion of node
FROM node:8.9

# Labels for the image
LABEL organization="INWK-DAL"
LABEL maintainer="Tito"
LABEL description="React Application for VIRL"

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Change working directory
WORKDIR /home/inwk-labs

# Copy package.json before other files to avoid unnecessary npm install(s)
COPY ./package.json .

# Install Stuff and  take care of node-sass enviroment error
RUN npm install


# Copy all local files into the image.
COPY . .


RUN npm rebuild node-sass


# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s build

