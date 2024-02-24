const Problem = require('../models/Problem');

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitProblem = async (req, res) => {
    const { userCode, userLang } = req.body;
    const selectedProblemId = req.params.id;

    try {
        const problem = await Problem.findById(selectedProblemId);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        const result = {};

        for (let i = 0; i < problem.testCases.length; i++) {
            const testCase = problem.testCases[i];

            const compileResponse = await axios.post('http://localhost:8000/compile', {
                code: userCode,
                language: userLang,
                input: testCase.input
            });

            if (compileResponse.status === 200 && 'output' in compileResponse.data) {
                const testCaseResult = compileResponse.data.output.trim() === testCase.output.trim();
                result[`testcase${i + 1}`] = testCaseResult;
            } else {
                result[`testcase${i + 1}`] = false;
            }
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getProblemById,
    submitProblem
};
