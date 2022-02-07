var express = require('express')
const CrewMember = require("../models/CrewMember");
var router = express.Router();

//afiseaza toti memrbii
router.get("/", async(req, res) => {
  try {
      const crewmembers = await CrewMember.findAll();
      return res.status(200).json(crewmembers);
  } catch (err) {
      return res.status(501).json(err);
  }
});
//creaza membru
router.post("/", async (req, res, next) => {
  try {
    await CrewMember.create(req.body);
    res.status(201).json({ message: "Member Created!" });
  } catch (err) {
    next(err);
  }
});
//gaseste membru dupa id
router.get("/:memberId", async(req, res) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if (crewmember) {
          return res.status(200).json(crewmember);
      } else {
          return res.status(404).json({ error: `Crew member with the id ${req.params.memberId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});


//actualizeaza membru
router.put("/:memberId", async(req, res) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if(crewmember){
        await crewmember.update(req.body);
        return res.status(201).json(crewmember);
      }else{
        return res.status(404);
      }
  } catch (err) {
      res.status(501).json(err);
  }
})


//sterge membru
router.delete("/:memberId", async(req, res,next) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if (crewmember) {
          await crewmember.destroy();
          res.status(200);
      } else {
          res.status(200);
      }
  } catch (err) {
      next(err);
  }
})

module.exports = router