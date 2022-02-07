var express = require('express')
const Movie = require("../models/Movie");
const CrewMember = require("../models/CrewMember");
var router = express.Router();
const Sequelize=require('sequelize')
const Op = Sequelize.Op

//afiseza filmele
router.get("/", async(req, res) => {
  try {
    const {sortBy, titlu, categorie}=req.query;
    let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 1
    let page = req.query.page ? parseInt(req.query.page) : 0
    let whereClause={}
    
    if(titlu)
    whereClause.title=titlu;
    if(categorie)
    whereClause.category=categorie;
      const movies = await Movie.findAll({
        order:sortBy?[[sortBy, 'ASC']]:undefined,
        where:whereClause,
        limit:pageSize,
        offset:page*pageSize


      });
      return res.status(200).json(movies);
  } catch (err) {
      return res.status(501).json(err);
  }
});
//afisezza film dupa id
router.get("/:movieId", async(req, res) => {
  try {
      const movie = await Movie.findByPk(req.params.movieId);
      if (movie) {
          return res.status(200).json(movie);
      } else {
          return res.status(404).json({ error: `Movie with the id ${req.params.movieId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});

//afiseaza membri dintr-un film
router.get("/:movieId/crewmembers", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId, {
      include: [CrewMember]
    });
    if (movie) {
      res.status(200).json(movie.crewmembers);
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

//afiseaza un anumit membru dintr-un anumit film
router.get("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        res.status(202).json(crewmember);
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

//creaza film
router.post("/", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.status(201).json({ message: "Movie Created!" });
  } catch (err) {
    next(err);
  }
});
//modfica film
router.put('/movies/:id', async (req, res) => {
  try {
      const movie = await Movie.findByPk(req.params.id)
      if (movie){
          await movie.update(req.body)
          res.status(202).json({message : 'accepted'})
      }
      else{
          res.status(404).json({message: 'not found'})
      }
  } catch (err) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }    
});
//adauga membu la film
router.post("/:movieId/crewmembers", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmember = new CrewMember(req.body);
      crewmember.movieId = movie.id;
      await crewmember.save();
      res.status(201).json({ message: 'Crew member created!'});
    } else {
      res.status(404).json({ message: '404 - Movie Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

//modfica memebru film
router.put("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        crewmember.name = req.body.name;
        crewmember.role = req.body.role;
        await crewmember.save();
        res.status(202).json({ message: 'Crew Member updated!' });
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

//sterge memrbu film
router.delete("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        await crewmember.destroy();
        res.status(202).json({ message: 'Crew Member deleted!' });
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});
//sterge film dupa id
router.delete("/:movieId", async(req, res) => {
  try {
      const movie = await Movie.findByPk(req.params.movieId);
      if (movie) {
          await movie.destroy();
          res.status(202).json({ message: 'Movie deleted!' });
      } else {
          return res.status(404).json({ error: `Movie with the id ${req.params.movieId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});

module.exports = router;