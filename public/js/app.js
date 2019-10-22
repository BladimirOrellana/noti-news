$(document).ready(function(){

    //FUNCTION TO GET ALL DATA FROM /API/POSTS AND USED FOR SIDEBAR CONTENT
    const getSidebarPosts = function(){
        $.ajax({
            url: '/api/saved/posts',
            type: "GET"
        }).then(function(result){
           for (var i = 0; i< result.length; i++){
               
            var contet = $("<div>");
            contet.addClass("card");
            contet.html(
            `
            <img src="${result[i].photo}" height="300"  class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${result[i].title}</h5>
             <a href="${result[i].link}" class="btn btn-primary btn-block">Read</a>
             <i class="fas fa-ellipsis-v menu menu-off"></i>
             <ul class="list-group menu-options">
  <li class="list-group-item delete-post" data-id="${result[i]._id}"><i class="fas fa-trash-alt"></i></li>
  <li class="list-group-item write-comment" data-id="${result[i]._id}"><i class="fas fa-comment"></i></li>
  
</ul>

            `)
 $(".side-bar").prepend(contet)


           }

     

        $(".menu").on('click', function(){

            if($('.menu-off')[0]){
               $(".menu").addClass('menu-on');
                $(".menu").removeClass('menu-off');
                $(".menu-options").show()
                //Calling the deletePost funtion
                deletePost();
               saveComment();
              
            }else{
                $(".menu").addClass('menu-off');
                $(".menu").removeClass('menu-on');
                $(".menu-options").hide()
            }
         })
        })

    }
    getSidebarPosts()

    // END FUNCTION getSidebarPosts()

$(".id").on('click', function(){
    
    var id = $(this).data('id');
    $.ajax({
        url: "/save/"+id,
        type: "GET"
    }).then(function(result){
console.log(result)
    })
})

// DELETE POST FUNCTION
var deletePost = function(){
    $(".delete-post").on('click', function(){
    
        var id = $(this).data('id');
       $.ajax({
            url: "/delete/"+id,
            type: "GET"
        }).then(function(result){
            console.log(result)
    if(result === 1){
        $('.deleted').modal('show');
        setTimeout(function(){
            location.reload();
            $(".deleted-message").html("Done!")
            setTimeout(function(){
            },2000);

        },1000)
       
    }else{
        alert("Sorry")
    }
        })
    })
}

var saveComment = function(){
    $(".write-comment").on('click', function(){
        var id = $(this).data('id');
        getComments(id);
        $(".comment-modal").modal('show');
        $(".save-comment").on('click', function(e){
            e.preventDefault()

            var comment ={
                title: $("#comment-title").val().trim(),
                body: $("#comment-body").val().trim()
            }
          
            $.ajax({
            url: '/comment/'+id,
            type: "POST",
            data: comment
        }).then(function(result){
            if(result === 1){
                $(".comment-alert").hide();
                location.reload();
                
            }else
            console.log(result)
            $(".comment-alert").show();
        })
            
        $("#comment-title").val('');
        $("#comment-body").val('');
        })
        $.ajax({
            url: '/comment/'+id,
            type: "GET"
        }).then(function(result){
            console.log(result)
        })
        
    })
}

var getComments = function(postId){
 
    $.ajax({
        url: "/api/comments/"+postId,
        type: "GET"
    }).then(function(result){
       if(result === null){
        $(".comments-body")
        .html(
            `
            <p class="text-muted">No Comments</p>
           
            `)
       }else{
        $(".comments-body")
        .html(
            `
            <p class="text-muted">Your Comment</p>
            <h5>${result.title}</h5>
            <p>${result.body}</p>
            <li class="list-group-item delete-comment" data-id="${result._id}"><i class="fas fa-trash-alt"></i></li>
  
            `)

            $(".delete-comment").on('click', function(){
                var commentId = $(this).data('id')
                $.ajax({
                    url: "/delete/comment/"+commentId,
                    type: "GET"
                }).then(function(result){
                      console.log(result)
                   if(result.ok === 1){
                    $(".alert").removeClass('alert-danger');
                    $(".alert").addClass('alert-success');
                    $(".alert").html(`<p>Comment Deleted</p>`);
                    $(".comment-alert").show();
                    setTimeout(function(){
                        $(".comment-modal").modal('hide')
                        $(".alert").hide();
                    },900)

                   }
                })
            })
       }
    })
}
})