require("dotenv").config({ path: ".env" });
const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const commentRepository = require("../repositories/comment.repository");

describe("Test's Comentarios", () => {
  const advertisementId = "637d48cb9312bcf1932a411a";
  let commentId = null;

  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    DB.disconnect().then(() => done());
  });

  describe("Agregar comentario", () => {
    it("Comentario agregado", async () => {
      const response = await commentRepository.newComment(
        advertisementId,
        "Agregar comentario 1"
      );
      const status = response.status;
      const data = response.data;

      commentId = data && data.newComment ? data.newComment.id : null;

      expect(data).to.be.an("Object");
      expect(data.newComment.text).equal("Agregar comentario 1");
      expect(status).equal(200);
    });
  });

  describe("Responder comentario", () => {
    it("Comentario respondido", async () => {
      const response = await commentRepository.newAnswer(
        commentId,
        "Responder comentario 1"
      );
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.updatedComment.answer.text).equal("Responder comentario 1");
      expect(status).equal(200);
    });

    it("Comentario no respondido", async () => {
      const response = await commentRepository.newAnswer(
        commentId,
        "Responder comentario 1"
      );
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Obtener comentarios", () => {
    it("Comentarios encontrados", async () => {
      const response = await commentRepository.get(advertisementId);
      const status = response.status;
      const data = response.data;

      expect(data.length).to.be.greaterThan(0);
      expect(status).equal(200);
    });

    it("Comentarios no encontrados", async () => {
      const response = await commentRepository.get("123");
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Borrar comentario", () => {
    it("Comentario borrado", async () => {
      const response = await commentRepository.delete(commentId);
      const status = response.status;

      expect(status).equal(200);
    });

    it("Comentario no borrado", async () => {
      const response = await commentRepository.delete(commentId);
      const status = response.status;

      expect(status).equal(400);
    });
  });
});
