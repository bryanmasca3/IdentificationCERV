import User from "../models/main.js";

export const createUser = async (req, res) => {
  try {
    const { name, surname, doi, photo, dob, address } = req.body;

    const newUser = new User({
      name,
      surname,
      doi,
      photo,
      dob,
      address,
    });
    await newUser.save();
    res.status(200).json({ data: null, message: "Registro Guardado" });
  } catch (error) {
    res.status(400).json({ error: "Existe un Error" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, surname, doi, photo, dob, address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.name = name;
    user.surname = surname;
    user.doi = doi;
    user.photo = photo;
    user.dob = dob;
    user.address = address;

    await user.save();
    res.status(200).json({ data: null, message: "Registro Guardado" });
  } catch (error) {
    res.status(400).json({ error: "Existe un Error" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const UserRes = await User.find({});
    res.status(200).json({ data: UserRes, message: "" });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const UserRes = await User.findOne({ _id: req.params.id });
    res.status(200).json({ data: UserRes, message: "" });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
};

export const getSomeUser = async (req, res) => {
  try {
    const { users } = req.body;
    const updatedUsers = await User.updateMany(
      { _id: { $in: users } },
      { $set: { ["print"]: true } }
    );
    const UserRes = await User.find({ _id: { $in: users } });
    res.status(200).json({ data: UserRes, message: "" });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
};
