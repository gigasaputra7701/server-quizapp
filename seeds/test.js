const mongoose = require("mongoose");
const Test = require("../models/test");

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://localhost:27017/quizapp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const seedTest = async () => {
  try {
    await Test.deleteMany();
    const tests = [
      {
        test_name: "Tes Pengetahuan Umum",
        description:
          "Tes untuk mengukur pengetahuan umum tentang berbagai topik.",
        questions: [
          {
            question_id: 1,
            question_text: "Apa nama ibukota dari Indonesia?",
            options: ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"],
            correct_answer: "Jakarta",
            type: "multiple_choice",
          },
          {
            question_id: 2,
            question_text: "Berapa hasil dari 10 + 15?",
            options: [20, 25, 30, 35, 40],
            correct_answer: 25,
            type: "multiple_choice",
          },
          {
            question_id: 3,
            question_text: "Apa nilai dari pi (π) hingga dua angka desimal?",
            options: [3.14, 3.15, 3.16, 3.17, 3.18],
            correct_answer: 3.14,
            type: "multiple_choice",
          },
          {
            question_id: 4,
            question_text: "Tanggal berapa Indonesia merdeka?",
            options: [
              "1945-08-17",
              "1950-05-05",
              "1940-01-01",
              "1955-10-10",
              "1960-01-01",
            ],
            correct_answer: "1945-08-17",
            type: "multiple_choice",
          },
          {
            question_id: 5,
            question_text: "Apa Kepanjangan dari AI?",
            options: [
              "Anonymous Internet",
              "Art Informations",
              "Artificial Intelligence",
              "Acceptance Invitation",
              "Advanced Integration",
            ],
            correct_answer: "Artificial Intelligence",
            type: "multiple_choice",
          },
        ],
      },
    ];

    await Test.insertMany(tests);
    console.log("Data tests berhasil dimasukkan!");
  } catch (error) {
    console.error("Terjadi kesalahan saat memasukkan data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTest();
