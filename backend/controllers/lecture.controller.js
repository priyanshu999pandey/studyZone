import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import uploadOnCloudinary from "../utills/cloudinary.js";

export const createLecture = async(req,res)=>{
   try {
    const {lectureTitle} = req.body;
    const {courseId} = req.params;
    
    if(!lectureTitle || ! courseId){
        return res.status(400).json({
          message:"lecture title is required"
        })
    }

    const lecture = await Lecture.create({
        courseId,
        lectureTitle
    });

    const course = await Course.findById(courseId)
    console.log("course.lecture",course.lectures);

    if(course){
        course.lectures.push(lecture._id)
    };
    console.log("course.lecture",course.lectures);
    console.log("lecture",course)

    await course.save();


    return res.status(200).json({
        message:"lecture created successfully!!",
        success:true,
        data:lecture
    })

   } catch (error) {
     return res.status(500).json({
      message:
        `create lecture error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
   }
}

export const getLecture = async(req,res)=>{
   try {
 
    const {courseId} = req.params;

    const lecture = await Lecture.find({courseId})


    return res.status(200).json({
        message:" lecture founded successfully!!",
        data:lecture
    })

   } catch (error) {
     return res.status(500).json({
      message:
        ` lecture found error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
   }
}

export const editLecture = async(req,res)=>{
    try {
         const {lectureId} = req.params;
         const {isPreviewFree,lectureTitle} = req.body;

         const lecture = await Lecture.findById(lectureId)

         if(!lecture){
            return res.status(404).json({
                message:"Lecture is Not found",
                success:false
            })
         }

         let videoUrl;

         if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl
         }

         if(lectureTitle){
            lecture.lectureTitle
         }

         console.log("video",videoUrl)

         lecture.isPreviewFree = isPreviewFree;

         await lecture.save();

         return res.status(200).json({
            message:"lecture edited successfully",
            success:true,
            data:lecture
         })


    } catch (error) {
    return res.status(500).json({
      message:
        `failed to edit lecture error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
    }
}

 export const removeLecture = async(req,res)=>{
      try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if(!lecture){
            return res.status(404).json({
               message:"lecture not found",
               success:false  
            })
        }

        await Course.updateOne({lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )

        return res.status(200).json({
            message:"lecture Removed",
            success:true,
            data:lecture
        })

      } catch (error) {
          return res.status(500).json({
      message:
        `failed to edit lecture error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
      }
 }

