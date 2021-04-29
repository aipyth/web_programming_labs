FROM alpine
WORKDIR /app
COPY ./weblabipt /app
CMD [ "/app/weblabipt" ]