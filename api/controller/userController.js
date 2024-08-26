import { User } from '../../models/userSchema.js';

const registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    uid,socketId } = req.body;

  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      uid,
      socketId
    });

    if (!user) {
      return res.status(500).send("Something went wrong while registering the user");
    }

    // Return the newly created user
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send("Server error: " + error.message);
  }
};

const userData = async (req, res) => {
  try {
    const uid = req.query.uid;
    const socketId=req.query.socketId
    if (!uid) {
      return res.status(400).send('ID is required');
    }
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).send('User not found');
    }
    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { socketId: socketId },
      { new: true, runValidators: true }
  );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
  }
};
const contactData = async (req, res) => {
  try {
    const _id = req.query._id;
    const user =await User.findById(_id);
    if (!user) {
      return res.status(404).send('user not found');
    }
    
    res.json({
      'firstName':user.firstName,
      'socketId':user.socketId,
      'userName':user.userName,
      '_id':user._id
    });
  } catch (error) {
    console.error("error");
    res.send(500).send('server error:' + error.message);
  }
};

const updateData = async (req, res) => {
  try {
    const uid = req.query.uid;
    const socketId=req.query.socketId
    if (!uid) {
      return res.status(400).send('ID is required');
    }
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).send('User not found');
    }
    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { socketId: socketId },
      { new: true, runValidators: true }
  );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
  }
};
const userNameData = async (req, res) => {
  const userName = req.query.userName;

  if (!userName) {
    return res.status(400).send("UserName Required");
  }

  try {
    const searchByUserName = await User.find({
      userName: { $regex: new RegExp(userName, 'i') } // Partial match with case-insensitivity
    });

    if (searchByUserName.length === 0) {
      return res.status(404).send("No User Found");
    }

    const results = searchByUserName.map(user => ({
      _id:user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    }));

    console.log(results);
    res.json(results);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Server Error");
  }
};

export { registerUser, userData, contactData ,updateData,userNameData};
