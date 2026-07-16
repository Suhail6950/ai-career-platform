import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resumeText:String,

    resumeScore:Number,

    atsScore:Number,

    strengths:[String],

    weaknesses:[String],

    missingSkills:[String],

    recommendations:[String],

    careerSuggestions:[String],

    interviewQuestions:[String]
},
{timestamps:true}
);

export default mongoose.model("Analysis",analysisSchema);
