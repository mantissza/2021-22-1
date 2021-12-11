const faker = require("faker");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const validate = require("./validate");

// Socket.IO emit cheat sheet: https://socket.io/docs/v4/emit-cheatsheet/
// Joi dokumentáció, példák: https://joi.dev/api/?v=17.5.0#general-usage

let db = {
    events: {
        "esemény 1": {
            uuid: "1111-2222-3333",
            socketId: "teacherSocket1",
            tasks: [
                {
                    uuid: "1111-2222-4444",
                    description: "task leírása",
                    solutions: [
                        {
                            solution: "megoldás szövege",
                            evaluation: "értékelés szövege",
                            socketId: "studentSocket1",
                        },
                    ],
                },
            ],
        },
    },
};

module.exports = {
    db,
    events: (io) => {
        io.on("connection", (socket) => {
            socket.on(
                "create-event",
                validate(
                    Joi.object({
                        name: Joi.string().trim().min(1).required(),
                        tasks: Joi.array().items(
                            Joi.object({
                                description: Joi.string().trim().min(1).required(),
                            })
                        ),
                    }),
                    // Feldolgozó fv
                    ({ name, tasks }, ack) => {
                        const uuid = uuidv4();
                        db.events[name] = {
                            uuid, // uuid: uuid,
                            socketId: socket.id,
                            tasks: tasks.map((task) => ({ ...task, uuid: uuidv4(), solutions: [] })),
                        };
                        console.log(JSON.stringify(db.events, null, 4));
                        ack({
                            status: "ok",
                            uuid,
                        });
                    }
                )
            );

            socket.on(
                "join-event",
                validate(
                    Joi.object({
                        uuid: Joi.string().guid({
                            version: ["uuidv4"],
                        }),
                    }),
                    // Feldolgozó fv
                    ({ uuid }, ack) => {
                        let event = null;
                        for (const [name, details] of Object.entries(db.events)) {
                            if (details.uuid === uuid) {
                                event = { name, ...details };
                                break;
                            }
                        }
                        if (!event) throw new Error("Event not found!");
                        ack({
                            status: "ok",
                            event: {
                                name: event.name,
                                uuid: event.uuid,
                                socketId: event.socketId,
                            },
                            tasks: event.tasks,
                        });
                    }
                )
            );

            socket.on(
                "send-solution",
                validate(
                    Joi.object({
                        taskUUID: Joi.string().guid({
                            version: ["uuidv4"],
                        }),
                        solution: Joi.string().trim().min(1).required(),
                    }),
                    // Feldolgozó fv
                    ({ taskUUID, solution }, ack) => {
                        let found = false;
                        const solutionEntry = {
                            // Megoldás szövege
                            solution,
                            // Kezdetben nincs értékelés
                            evaluation: "",
                            // Aki beküldte
                            socketId: socket.id,
                        };
                        for (const [name, details] of Object.entries(db.events)) {
                            for (task of details.tasks) {
                                if (task.uuid === taskUUID) {
                                    task.solutions.push(solutionEntry);
                                    // Tanár értesítése
                                    io.to(details.socketId).emit("solution-sent", {
                                        event: name,
                                        task: task.description,
                                        solution: solutionEntry,
                                    });
                                    // Nyugtázás a hallgatónak:
                                    ack({
                                        status: "ok",
                                    });
                                    found = true;
                                    break;
                                }
                            }
                        }
                        console.log(JSON.stringify(db.events, null, 4));
                        if (!found) throw new Error("Task not found!");
                    }
                )
            );
        });
    },
};
