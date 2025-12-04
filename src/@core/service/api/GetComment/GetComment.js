import toast from "react-hot-toast";
import http from "../../interceptor/index";
import useFormData from "../../../../utility/hooks/useFormData";

const GetAllComments = async (params) => {
  try {
    const result = await http.get(`/Course/CommentManagment`, {
      params: params,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};const GetCourseComments = async (id) => {
  console.log("iner",id);
  try {
    const result = await http.get(`/Course/GetCourseCommnets/${id}`, {
   
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};;const GetnewsComments = async (id) => {
  console.log("iner",id);
  try {
    const result = await http.get(`/News/GetNewsComments?NewsId=${id}`, {
   
    });
    
    return result.data;
  
  } catch (error) {
    console.log(error);
    return [];
  }
};

const AcceptCommentCourse = async (id) => {
  try {
    const result = await toast.promise(
      http.post(`/Course/AcceptCourseComment?CommentCourseId=${id}`),
      {
        pending: "در حال ثبت...",
        success: "کامنت مورد نظر ثبت شد",
        error: "دوباره تلاش کنید",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const DeleteCourseComment = async (id) => {
  try {
    const result = await toast.promise(
      http.delete(`/Course/DeleteCourseComment?CourseCommandId=${id}`),
      {
        pending: "در حال حذف...",
        success: "کامنت مورد نظر حذف شد",
        error: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const RejectCourseComment = async (id) => {
  try {
    const result = await toast.promise(
      http.post(`/Course/RejectCourseComment?CommentCourseId=${id}`),
      {
        pending: "در حال ثبت...",
        success: "کامنت مورد نظر رد شد",
        error: "دوباره تلاش کنید",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const GetReplayComments = async (Ids) => {
  if (Ids.courseId !== null && Ids.commentId !== null) {
    try {
      const result = await http.get(
        `/Course/GetCourseReplyCommnets/${Ids.courseId}/${Ids.commentId}`
      );
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    return [];
  }
};

const AddReplayComment = async (value, ids, refetch) => {
  try {
    const data = {
      CommentId: ids.commentId,
      CourseId: ids.courseId,
      Title: value.Title,
      Describe: value.Describe,
    };
    const formData = useFormData(data);
    const result = await toast.promise(
      http.post("/Course/AddReplyCourseComment", formData),
      {
        pending: "درحال ثبت شدن...",
        success: " ریپلای شما ثبت شد",
        error: "متن کامنت کم تر از حد مجاز",
      }
    );
    if (result.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  GetAllComments,
  AcceptCommentCourse,
  DeleteCourseComment,
  RejectCourseComment,
  GetReplayComments,
  AddReplayComment,
  GetCourseComments,
  GetnewsComments
};
