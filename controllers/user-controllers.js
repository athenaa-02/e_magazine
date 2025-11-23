import User from "../src/models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
  return res
    .status(500)
    .json({ message: "error occured while adding new users" });
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error occured while adding new user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findOneAndUpdate({ _id }, { email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json({message: 'error updating user', error: error.message})
  }
};

export const deleteUser = async (req, res) =>{
    try{
const {id} = req.params;
const user = await User.findByIdAndDelete(id);
if(!user){
    return res.status(404).json({message: 'user not found'})
}
  return res.status(200).json({message: 'user deleted successfully', user})
    
    }
  
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'error deleting user', error: err.message})
    }
}