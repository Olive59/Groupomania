// const Comment = require('../models/comment');
// const fs = require('fs');

// exports.createComment = (req, res, next) => {
//   console.log('req.body=', req.body);
//   const commentObject = JSON.parse(req.body.comment);
//   const comment = new Comment({
//     ...commentObject,
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   });
//   comment.save()
//     .then(() => res.status(201).json({
//       message: 'Objet enregistré !'
//     }))
//     .catch(error => res.status(400).json({
//       error
//     }));
// };

// exports.getOneComment = (req, res, next) => {
//   comment.findOne({
//     _id: req.params.id
//   }).then(
//     (comment) => {
//       res.status(200).json(comment);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// };

// exports.modifyComment = (req, res, next) => {
//   const commentObject = req.file ? {
//     ...JSON.parse(req.body.comment),
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : {
//     ...req.body
//   };
//   comment.updateOne({
//       _id: req.params.id
//     }, {
//       ...commentObject,
//       _id: req.params.id
//     })
//     .then(() => res.status(200).json({
//       message: 'Objet modifié !'
//     }))
//     .catch(error => res.status(400).json({
//       error
//     }));
// };

// exports.deleteComment = (req, res, next) => {
//   comment.findOne({
//       _id: req.params.id
//     })
//     .then(comment => {
//       const filename = comment.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, () => {
//         comment.deleteOne({
//             _id: req.params.id
//           })
//           .then(() => res.status(200).json({
//             message: 'Objet supprimé !'
//           }))
//           .catch(error => res.status(400).json({
//             error
//           }));
//       });
//     })
//     .catch(error => res.status(500).json({
//       error
//     }));
// };

// exports.getAllComment = (req, res, next) => {
//   console.log('dans comment.js')
//   console.log('req=', req)
//   comment.find().then(
//     (comments) => {
//       res.status(200).json(comments);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

