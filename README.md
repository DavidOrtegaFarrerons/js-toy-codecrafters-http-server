CodeCrafters Build your own HTTP Server (JS)
============================================

## Table of Contents
2. [Stage 2](#stage-2)
3. [Stage 3](#stage-3)
4. [Stage 4](#stage-4)
5. [Stage 5](#stage-5)
6. [Stage 6](#stage-6)
7. [Stage 7](#stage-7)
8. [Stage 8](#stage-8)
9. [The End](#the-end)
10. [How to run it](#how-to-run-it)

Disclaimer: As Stage 0 is to clone the repository and Stage 1 is to uncomment code, they have not been included in the table of contents, so the explanation starts in Stage 2.
### Stage 2
--------

For stage 2, my first step was to convert the port and the hostname to constants so that the code was more readable:

```
const PORT = 4221;
const HOSTNAME = "localhost";

```

Then, I checked what the requirements were:

> **Requirements:** Respond with 200 


Checked for which event gets fired when there is an income request to the server, its the socket.on("data") event.

```
socket.on("data", (data) => {
	//code
});

```

Then, I simply did a socket.write() with the 200 status (following the standard guidelines for HTTP Response). [Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/e28516a8c0c37ac130dc982c32088462fd04c196)

```
socket.write("HTTP/1.1 200 OK\\r\\n\\r\\n");

```

### Stage 3
--------

On stage 3 started again with some refactoring, now we have two possible responses, so the first thing was to define them, I also added the HTTP Version as a constant so it was more clear what the code did:

```
const HTTP_VERSION = "HTTP/1.1";
const STATUS = {
    "200": "200 OK",
    "404": "404 Not Found"
}

```

Now that everything was a bit clearer, I started with the task:

> **Requirements:**
**If the path is `/`, you'll need to respond with a 200 OK response. Otherwise, you'll need to respond with a 404 Not Found response.**

First thing was to get the path, otherwise we wouldn't know which response to send, so I first got all the request information and then extracted the path from it:

```
let requestInfo = data.toString(); //data comes from socket.on("data", (data)
let path = requestInfo.split(' ', 2)[1];

```

Finally, I created a function that would give us the status depending on the given path. This function could have been written directly in the data event, but I think that the code describes what it does better this way:

```
function responseByPath(path) {
    let status = path === "/" ? STATUS["200"] : STATUS["404"];

    return HTTP_VERSION + " " + status + "\\r\\n\\r\\n";
}

```

Finally, we send it like this:

```
let response = responseByPath(path);

        socket.write(response);

```

[Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/79dc5ae7454ada1214ecaa8890da23602c808c22)

### Stage 4

For stage 4, the requirements were:

> **Requirements:** The tester will send you a request of the form `GET /echo/<a-random-string>`. Your program will need to respond with a 200 OK response. The response should have a content type of `text/plain`, and it should contain the random string as the body.

So, now we have different routes, we have to send a response with a content type and a body, looks like we can create a class for it, and so did I.

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F372aa431-9022-4ffa-8514-87c90193217f%2FUntitled.png?table=block&id=0b0083a5-f2fe-418c-8eaf-855d57a41aae&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

One cool tip I can give you is that the contentLength only changes when the body changes, so, we can do something like this:

```
setBody(body) {
        this.body = body;
        this.contentLength = Buffer.byteLength(body, 'utf-8');
        return this;
    }

```

And then we'll make sure that every time the body is setted, the contentLength will also be.

As we have a Response class, and we will need different types of responses, I thought of using a ResponseFactory, who would be responsible for giving different responses:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F60ccf1da-74f6-4475-a203-e1b2467ee2d3%2FUntitled.png?table=block&id=25a67952-847d-4fc0-bb3e-9f7d0c6514d6&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

Now we have a Response that is structured correctly, and a factory that creates them based on parameters. Its time to create a simple routing:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2Fc93db307-c8d0-4796-8926-898b9874e8a7%2FUntitled.png?table=block&id=f8eb4e15-0de1-4c49-bf35-749388975a5e&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

When we have routes that contain a "*" or "{string}" at the end, I had no other way of checking them than going the old way, using the `path.includes('/echo')` made the trick for me.

Now, we have a router, responses, but we still need some handlers for this requests:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F3160a201-f2b1-4ed5-975f-952cf694ed99%2FUntitled.png?table=block&id=8d0d01cb-1ac2-42bb-8970-8eef1c328c3f&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2Fef764b8c-72a8-42c9-b243-c28d18819d3b%2FUntitled.png?table=block&id=8af0fbc0-8eb0-4ac4-a692-af15193245fe&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

With all of this, we have finished stage 4! (It is not necessary to make all this refactoring, indeed, I haven't seen many users create any file besides the one given from codecrafters, but this is not a race, we can spend as much as we want making things as we would like to find them!).

[Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/753128c58451a4b4d961c3b3837972094237dd3f) [Fix](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/365b6dbe9b23a77b7848cdbf25de9626bd0ef8a0) [Fix2](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/2c58c57edc856d1620c31f75310722676d1fdeef)

### Stage 5

Now I won't be explaining everything into detail as you now know that we have a router, the factory and the handlers for the requests. So, requirements for this stage are:

> **Requirements:** The tester will send you a request of the form `GET /user-agent`, and it'll include a `User-Agent` header. Your program will need to respond with a 200 OK response. The response should have a content type of `text/plain`, and it should contain the user agent value as the body.

This is an easy one! We just have to create the Handler, add it into the router, and add the required logic:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2Fda127576-e511-43cd-b71c-db9b8378d943%2FUntitled.png?table=block&id=eb71a7fe-a1ed-43d0-92b9-07670e0771e5&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

[Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/79c79dd5da24016a1dbf7e0eee78e250f3c73106) [Fix](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/fff0c3ea01dd80bc1d84a3117af4105815fe0e11)

### Stage 6

Requirements for this stage were simple:

> **Requirements:** In this stage, your server will need to handle multiple concurrent connections.

So that's what I did, simply removing this line:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F33ad49ac-820f-4a04-90d1-00294af5f141%2FUntitled.png?table=block&id=199ed6b4-f405-4cd4-b6cd-af78b56ebfe5&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=610&userId=&cache=v2)

[Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/042a495f8e2c7be4a1f9f3226e8f0a6e6f06c7cf)

### Stage 7

We are almost finished, and now, things start to get a bit more complicated!


> **Requirements:** The tester will execute your program with a `--directory` flag like this:

```
./your_server.sh --directory <directory>

```

> It'll then send you a request of the form `GET /files/<filename>`.

> If `<filename>` exists in `<directory>`, you'll need to respond with a 200 OK response. The response should have a content type of `application/octet-stream`, and it should contain > the contents of the file as the body.

So, for this task I needed to see how to get the sent arguments in js (spoiler: ***`process***.argv`), then, I needed to try and read a file, and finally, send the response:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2Fbebae6cb-4b41-4235-98bb-34ea226d2838%2FUntitled.png?table=block&id=3607003e-aaa4-43ea-954a-32322669ad57&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

### Stage 8

Last stage! We are almost there, let's see the requirements:

> **Requirements:** Just like in the previous stage, the tester will execute your program with a `--directory` flag like this:

```
./your_server.sh --directory <directory>

```

> It'll then send you a request of the form `POST /files/<filename>`. The request body will contain the contents of the file.

> You'll need to fetch the contents of the file from the request body and save it to `<directory>/<filename>`. The response code returned should be 201.

> The good part of preparing the code to be easy to extend and to have it decoupled, makes that the problem of having GET and POST requests (when our code thought we would only have > "GET" ones), gets away easily by adding some changes on the router:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F790cdb04-b887-4eec-ad18-7ede1a1af7ba%2FUntitled.png?table=block&id=c3f477d4-7087-4e77-a99a-6505719bf191&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

[Commit](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commit/53d071dcdf3d645c22a81380b66879d3ed31e810#diff-c2dc09eb867d41ec8544280b8582b73ddb05445765370cc2e3f7846716d27f88)

Now, we just create the new handler with the logic inside it:

![Untitled](https://daily-spleen-27b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38351216-7c14-43ba-9f43-3544161f633a%2F1a59c9ab-bc1e-4a27-86e9-805707c53b77%2FUntitled.png?table=block&id=bb01d601-880b-4a24-b994-8fc87f0a7b2c&spaceId=38351216-7c14-43ba-9f43-3544161f633a&width=2000&userId=&cache=v2)

[All commits](https://github.com/DavidOrtegaFarrerons/js-toy-codecrafters-http-server/commits/master)

### The end:

And with that, we have finished the Create your own HTTP Server track. It's been a fun ride, although short, it is always cool to code in ways that you don't usually do (no, I don't make HTTP Servers at my current job). And it also shows us how things work under the hood, or at least a bit.

Some things that I'd like to refactor in the future are:

Add helper class to get the different parts of a requests (method, path, body etc..).

Maybe Handlers could have pointed to services so that if in the future any operation a handler does, is required by another, it just has to call the service, but as I have not seen it necessary and the code is very small, I have not done it yet.

Hope you liked this Readme / Post.


## How to run it:

In order to run the project, make sure you have node.js v18 installed. Then, you can run the `./your_server.sh` (if you want to get and post files, use the `--directory`: `./your_server.sh --directory /path/to/directory`).
