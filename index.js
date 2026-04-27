require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));


const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    job: { type: String }

}, { timestamps: true });

const User = mongoose.model("user", userSchema);

app.get('/users', async (req, res) => {
    const allUsers = await User.find({});
    const html = `
    <ul>
    ${allUsers.map((user) => `<li> ${user.name}</li>`).join("")}
    </ul>
    `;
    res.send(allUsers);
    // res.send(html);

});

app.route("/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        return res.json(user);
    })
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { email: "nizam@gmail.com" })
        return res.json({ status: "Success" })
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success" })
    })

app.post("/post", async (req, res) => {
    const body = req.body;

    if (!body.name || !body.email || !body.job) {
        return res.status(400).json({ msg: "Error Occured" })
    }

    const result = await User.create({
        name: body.name,
        email: body.email,
        job: body.job,
    });
    console.log("result", result);
    return res.status(201).json({ msg: "Success" })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});