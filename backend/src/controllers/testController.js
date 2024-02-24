const Test = require('../models/Test');
const Problem = require('../models/Problem');

const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find().populate('problems');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tests' });
    }
};

const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id).populate('problems');
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json(test);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch test' });
    }
};

const createTest = async (req, res) => {
    const { title, description } = req.body;
    try {
        const test = new Test({ title, description });
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create test' });
    }
};

const addProblem = async (req, res) => {
    const { id } = req.params;
    const { title, description, sampleInput, sampleOutput, testCases } = req.body;
    try {
        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        const problem = new Problem({ title, description, sampleInput, sampleOutput, testCases });
        const savedProblem = await problem.save();
        test.problems.push(savedProblem._id);
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add problem to test' });
    }
};

module.exports = {
    getAllTests,
    getTestById,
    createTest,
    addProblem
};
