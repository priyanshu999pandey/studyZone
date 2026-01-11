import stripe from "../config/stripe.js";

 export const checkOutController = async (req, res) => {
  try {
    const userId = req.userId
    const {courseName,price,courseId} = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        mode:"payment",

        line_items:[
            {
               price_data:{
                currency:"inr",
                product_data:{
                    name:courseName,
                },
                unit_amount: price * 100
               },
               quantity:1
            }
        ],

        metadata:{
            userId:userId,
            courseId:courseId
        },

        success_url:`${process.env.CLIENT_URL}/payment-success`,
        cancel_url:`${process.env.CLIENT_URL}/payment-cancel`

    })

    res.status(200).json({
        message:"payment successfull",
        url:session.url
    })

  } catch (error) {
    return res.status(500).json({
      message:
        `failed to payment error ${error.message}` ||
        "Internal server error",
      error: true,
      success: false,
    });
  }
};
export const stripeWebhook = async(req,res)=>{
    try {
        const signature = req.headers["stripe-signature"];

        let event;

        try{
            
        }
        
    } catch (error) {
         return res.status(500).json({
      message:
        `failed at stripeWebHook error ${error.message}` ||
        "Internal server error",
      error: true,
      success: false,
    });
    }
}
