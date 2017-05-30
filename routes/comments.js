var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("comments/new", {campground: campground});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup campground using ID
        Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            //create a new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.render("new");
                } else {
                    //add username and it to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                
                    req.flash("success", "Successfully added comment");
                    //redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            }); 
        }
    });
});

// EDIT COMMENT ROUTE
///campgrounds/:id/comments/:id/edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        res.render("comments/edit", {campground_id: req.params.id, comment: comment});
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // find and update the correct campground
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
           res.redirect("back");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

module.exports = router;