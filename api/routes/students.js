const router =require("express").Router();
let Student = require("../models/student");

router.route("/add").post(
    (req,res)=>{

        try {
            const fname = req.body.fname;
            const lname = req.body.lname;
        const contactnumber = Number(req.body.contactnumber);
        const nationalId = req.body.nationalId;
        const email = req.body.email;
        const subjects=req.body.subjects;
        const dateOfBirth=req.body.dateOfBirth;

        const newStudent = new Student({

            fname,lname,contactnumber,nationalId,email,subjects,dateOfBirth
        })
        newStudent.save();
        res.json("student Added");
        } catch (error) {
            console.log(error);
        }
    }
) 

router.route("/").get((req,res)=>{

    try {
        Student.find().then((students)=>{
            res.json(students)
   
       });  
    } catch (error) {
        console.log(error)
    }

})

router.route("/update/:id").put(async(req,res)=>{
    
        Student.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (error,post)=>{
                if(error){
                    return res.status(400).json({error:error});
                }
                return res.status(200).json({
                    success:"Update successfully"
                })
            }
        )

})

router.route("/delete/:id").delete(async(req,res)=>{

    let userId =req.params.id;
    
  await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"user deleted"});
      
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with delete user",error:err.massage})
    })
})

//get one data set
router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    await Student.findById(userId)
    .then((student)=>{
        res.status(200).send({status : "User fetched", student});
    })
    .catch(()=>{
        res.status(500).send({status : "error with get user"});
    })
})

module.exports = router;

