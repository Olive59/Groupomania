const Article = require('../models/article');
const fs = require('fs');
let articles = [];

exports.createArticle = (req, res, next) => {
  console.log('req.body=', req.body);
  const articleObject = JSON.parse(req.body.article);
  const article = new Article({
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  article.save()
    .then(() => res.status(201).json({
      message: 'Objet enregistré !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

exports.getOneArticle = (req, res, next) => {
  Article.findOne({
    _id: req.params.id
  }).then(
    (article) => {
      res.status(200).json(article);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ? {
    ...JSON.parse(req.body.article),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  };
  Article.updateOne({
      _id: req.params.id
    }, {
      ...articleObject,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Objet modifié !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

exports.deleteArticle = (req, res, next) => {
  Article.findOne({
      _id: req.params.id
    })
    .then(article => {
      const filename = article.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Objet supprimé !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};

exports.getAllArticle = (req, res, next) => {
  console.log('req=', req)
  Article.getAllPost().then(
    (articles) => {      
      res.status(200).json(articles);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeDislike = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
      .then(article => {

          if (article.usersLiked.includes(req.body.userId)) {
              article.usersLiked.splice(article.usersLiked.indexOf(req.body.userId), 1);
          }
          if (article.usersDisliked.includes(req.body.userId)) {
              article.usersDisliked.splice(article.usersDisliked.indexOf(req.body.userId), 1);
          }
          switch (req.body.like) {
              case 1:
                  article.usersLiked.push(req.body.userId);
                  break;
              case -1:
                  article.usersDisliked.push(req.body.userId);
                  break;
              case 0:
                  break;
              default:
                  res.status(400).json({ error: 'Bad Request' });
          }
          article.likes = article.usersLiked.length;
          article.dislikes = article.usersDisliked.length;
          article.save()
              .then(() => {
                  res.status(201).json({ message: 'Article enregistrée !' })
              })
              .catch(error => {
                  res.status(500).json({ error });
              })
      })
      .catch(error => res.status(500).json({ error }));

};
