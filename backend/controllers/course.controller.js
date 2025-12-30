import Course from "../models/course.model.js";
import uploadOnCloudinary from "../utills/cloudinary.js";


export const createCourse = async(req,res)=>{
    try {
        const userId  = req.userId
      const {title,category} = req.body;
      if(!title|| !category){
        return res.status(400).json({
          message:"title and category required",
          success:false
        })
      }

      const course = await Course.create({
        title,
        category,
        creator:userId
      })
      
      return res.status(200).json({
        message:"course created sucessfully",
        success:true,
        data:course
        
      })
        
    } catch (error) {
         return res.status(500).json({
      message:
        `create course error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
    }
}

export const getPublishedCourses = async(req,res) =>{
  try {
    const userId = req.userId;
    const publishedCourses = await Course.find({isPublished:true});

    if(!publishedCourses){
      return res.status(400).json({
        message:"courses not found",
        success:false
      })
    }

    return res.status(200).json({
      message:"course founded successfully",
      success:true,
      user:userId,
      publishedCourses,
    })


  } catch (error) {
    return res.status(500).json({
      message:
        `getPublishedCourse error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
}

export const getCreatorCourse = async(req,res)=>{
  try {
    const userId = req.userId;

    const creatorCourses = await Course.find({creator:userId});

    if(!creatorCourses){
      return res.status(400).json({
         message:"No course found",
         success:false
      })
    }

    return res.status(200).json({
      message:"Creator course found sucessfully",
      success:true,
      data:creatorCourses
    })
    
  } catch (error){
     return res.status(500).json({
      message:
        `get creator course error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
}

export const editCourse = async(req,res)=>{
  try {
     const {courseId} = req.params;
     const {title,subTitle,description,category,level,isPublished,price} = req.body;

     let thumbnail;
     if(req.file){
      thumbnail = await uploadOnCloudinary(req.file.path);
     }

     let course = await Course.findById(courseId);
     if(!course){
      return res.status(400).json({
        message:"Course Not Found",
        success:false
      })
     }

     course = await Course.findByIdAndUpdate(courseId,{
       title,
       subTitle,
       description,
       category,
       level,
       isPublished,
       price,
       thumbnail
     },{new:true});

      if(!course){
      return res.status(400).json({
        message:"Failed to update course",
        success:false
      })
     }

     return res.status(200).json({
      message:"Course edit successfully",
      success:true,
      course
     })


  } catch (error) {
    return res.status(500).json({
      message:
        `edit course error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const getCourseById = async(req,res)=>{
  try {

    const {courseId} = req.params;

    const course = await Course.findById(courseId);
     if(!course){
      return res.status(400).json({
        message:"Course Not Found",
        success:false
      })
     }

     return res.status(200).json({
      message:"Course Found Sucessfully",
      success:true,
      course
     })
    
  } catch (error) {
     return res.status(500).json({
      message:
        `get course by id error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
}

export const removeCourse = async(req,res)=>{
  try {
    const {courseId} = req.params;

    const deleteCourse = await Course.findByIdAndDelete(courseId,{new:true});

    if(!deleteCourse){
      return res.status(400).json({
        message:"Failed to delete Course",
        success:false
      })
     }

     return res.status(200).json({
      message:"Remove Course Successfully",
      success:true,
      deleteCourse
     })

  } catch (error) {
    return res.status(500).json({
      message:
        `remove course by id error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
}
