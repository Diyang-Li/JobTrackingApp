import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];
export const getAllJobs = async (req, res) => {
  // const jobs = await Job.find({ company: "intel" });
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  // const { company, position } = req.body;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new Error(`no job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log(updatedJob);
  if (!updatedJob) {
    return res.status(400).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "job has modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(400).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ mag: "job has deleted", removedJob });
};