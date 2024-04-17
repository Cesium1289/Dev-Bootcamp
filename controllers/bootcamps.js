const BootCamp = require("../models/bootcamps");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc     Get single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update  bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).josn({ success: false });
  }
};

//@desc     Delete bootcamps
//@route    DELETE /api/v1/bootcamps
//@access   Private
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).josn({ success: false });
  }
};
