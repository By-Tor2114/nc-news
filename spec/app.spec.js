process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const { app } = require("../app.js");
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/api", () => {
  // <----- 404 Handling for path not found ----->
  it("status 404 for invalid path", () => {
    return request(app)
      .get("/no-such-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("path not found");
      });
  });
  describe("/api/topics", () => {
    describe("GET", () => {
      it("returns a status of 200", () => {
        return request(app)
          .get("/api/topics")
          .expect(200);
      });
      it("returns an array of object(s) containing specific keys", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0]).to.be.an("object");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      // <----- Error handling ----->
      it("status 405 for method not allowed", () => {
        return request(app)
          .post("/api/topics")
          .send("hello")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
    });
  });

  describe("/api/users/:username", () => {
    describe("GET", () => {
      it("returns a status of 200", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200);
      });
      it("returns an object containing a user identified by username", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body.user).to.eql({
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
            });
          });
      });
      // <----- Error handling ----->
      it("status 405 for method not allowed", () => {
        return request(app)
          .post("/api/users/lurker")
          .send("hello")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
    });
  });

  describe("/api/articles/:article_id", () => {
    describe("GET", () => {
      it("returns a status of 200", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200);
      });
      it("returns an article object containing an additional comment count key/value", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an("object");
            expect(body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      // <----- Error handling ----->
      it("status 400 for bad request", () => {
        return request(app)
          .get("/api/articles/bad-request")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("bad request");
          });
      });
      it("status 405 for method not allowed", () => {
        return request(app)
          .delete("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
    });

    describe("PATCH", () => {
      it("returns a status of 200", () => {
        return request(app)
          .patch("/api/articles/1")
          .expect(200);
      });
      it("returns an article with an updated vote count", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys("votes");
            expect(body.article.votes).to.equal(101);
          });
      });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    describe("POST", () => {
      it("returns the post comment in an object", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge", body: "music is okay" })
          .expect(201)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.author).to.equal("butter_bridge");
            expect(body.comment.body).to.equal("music is okay");
          });
      });
    });
    describe("GET", () => {
      it("returns a status of 200 and a list of comments that are related to the supplied article_id, and a default sorting of desc, with a default order by of created_at", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.an("array");

            for (let i = 0; i < body.length; i++) {
              expect(body.comments[i].article_id).to.equal(1);
            }
            expect(body.comments).to.be.descendingBy("created_at");
          });
      });
      it("returns a status of 200 and a list of comments that are related to the supplied article_id, and ordered by the user supplied column name, with an ascending order (supplied by user)", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author&&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.an("array");

            for (let i = 0; i < body.length; i++) {
              expect(body.comments[i].article_id).to.equal(1);
            }
            expect(body.comments).to.be.ascendingBy("author");
          });
      });

      // <----- Error handling ----->
      it("returns 404 when the given username does not exist within the database", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "geddy_lee", body: "music is okay" })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("user does not exist");
          });
      });
      it("returns a 400 when asked to sort by a column that does not exist", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=NoSuchColumn&&order=asc")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("bad request");
          });
      });
      it("resorts to default sorting when presented with an invalid sort_by parameter", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author&&order=sideways")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("author");
          });
      });
      it("returns a 405 for invalid method", () => {
        return request(app)
          .delete("/api/articles/1/comments?sort_by=author&&order=asc")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
    });
  });

  describe("/api/articles", () => {
    describe("GET", () => {
      it("returns an array of object(s)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.be.an("object");
          });
      });
      it("returns an array of object(s) containig specific keys", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.have.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("returns an array of object(s) containig specific keys, sorted_by a user supplied column name (topics) and a user supplied order (asc)", () => {
        return request(app)
          .get("/api/articles?sort_by=topic&&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("topic");
          });
      });
      it("returns an array of object(s) filtered by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            for (let i = 0; i < body.length; i++) {
              expect(body[i].author).to.equal("butter_bridge");
            }
          });
      });
      it("returns an array of object(s) filtered by author", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            for (let i = 0; i < body.length; i++) {
              expect(body[i].topic).to.equal("mitch");
            }
          });
      });

      // <----- Error Handling ----->
      it("returns a 400 when asked to sort by a column that does not exist", () => {
        return request(app)
          .get("/api/articles?sort_by=fruit")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("bad request");
          });
      });
      it("returns a 404 when provided a non-existent topic", () => {
        return request(app)
          .get("/api/articles?topic=not-a-topic")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("topic does not exist");
          });
      });
      it("returns a 404 when provided a non-existent author", () => {
        return request(app)
          .get("/api/articles?author=not-an-author")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("author does not exist");
          });
      });
      it("resorts to default sorting when presented with an invalid sort_by parameter", () => {
        return request(app)
          .get("/api/articles?sort_by=topic&&order=sideways")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("topic");
          });
      });
      it("returns a 405 for invalid method", () => {
        return request(app)
          .delete("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
    });
  });

  describe("/api/comments/:comment_id", () => {
    describe("PATCH", () => {
      it("returns a comment object with an updated vote count when passed a negative integer", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.votes).to.equal(15);
          });
      });
      it("returns a comment object with an updated vote count when passed a positive integer", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.votes).to.equal(17);
          });
      });
    });
    describe("DELETE", () => {
      it("deletes a comment by comment Id", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204);
      });
    });

    // <----- Error Handling ----->
    it("status 400 for bad request", () => {
      return request(app)
        .patch("/api/comments/bad-request")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 405 for invalid method", () => {
      return request(app)
        .post("/api/comments/1")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("method not allowed");
        });
    });
  });
});
