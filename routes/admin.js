const express = require('express');
const router = express.Router();

const Admin = require("../models/Admin")

router.post("/", async (req,res) =>{
  try {
      
      const foundAdmin = await Client.findOne({email: req.body.email}) 

      if (foundAdmin){
        if(foundAdmin.validPassword(req.body.password)) {
            req.session.logged = true;
            req.session.email = req.body.email;
            req.session.userDbId = foundAdmin._id;
            console.log(req.session)
            res.json({
                user: foundAdmin,
                status: 200,
                success: foundAdmin ? true : false
            })
        } else {
            req.session.message = "Invalid Email or Password"
            res.json({
                message: req.session.message
            })
        }
      } 
  } catch (error) {
      req.session.message = "Invalid Username or Password"
      res.json({
          message: req.session.message
      })
  }
})

router.put('/:id', async (req, res) => {
  if(!req.body.password){
    delete req.body.password
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) 
  }
  try {
    const editedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new:true});
    editedAdmin.save()
    res.json({
      editedAdmin
    });
  } catch (error) {
    res.json({error})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndRemove(req.params.id)
    await Client.deleteMany({_id: { $in: deletedAdmin.clients }})
    res.json(deletedAdmin)
  } catch (error) {
    console.log(error)
  }
})

router.post('/new', async (req, res) => {
  try {
    console.log(req.body)
    const newAdmin = await Admin.create(req.body)
    console.log(newAdmin)
    res.json({
      newAdmin,
      success: newAdmin ? true : false
    })
    
  } catch (error) {
    res.json(error)
  } 
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
  if(err){
  res.json(err);
  } else {
  res.redirect('/');
  }
  })
})

module.exports = router;