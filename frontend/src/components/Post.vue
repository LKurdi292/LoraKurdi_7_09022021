<template>
	<div class="postContainer">
		<div class="postHeader">
			<div class="leftSideHeader">
				<div class="userPicContainer">

				</div>

				<div class="authorAndDate">
					<p>{{ authorFname }} {{ authorLname }}</p>
					<p> le {{ formattedPublicationDate }} </p>
				</div>
			</div>

			<div class="rightSideHeader" v-show="authorEQuser || $store.state.user.isAdmin">
				<button class="button" @click="showAlert">Delete</button>
			</div>
		</div>

		<div class="postContent">
			<p class="postContent_title">{{ postTitle }}</p>
			<p class="postContent_content">{{ postContent }}</p>
		</div>

		<div class="postNumbers">
			<p :class="{orange: hasLiked}"> 
				<fas class="icon" icon="thumbs-up"></fas>
				{{ usersLiked.length }}
			</p>
			<p>{{ comments.length }} comments</p>
		</div>

		<div class=postActionsContainer>
			<div class="likeContainer">
				<a @click.prevent="likePost" title="Like or dislike the post">
					<fas class="icon-action" icon="thumbs-up"></fas>
					<p>Like</p>
				</a>
			</div>
			<div class="commentContainer">
				<a @click.prevent="triggerWritingComment" title="Comment or close input">
					<fas class="icon-action" icon="comment"></fas>
					<p>Add a comment</p>
				</a>
			</div>
		</div>

		<div v-show="writingComment" class="commentInputContainer">
			<div class="userPicContainer">

			</div>
			<input ref="firstField" type="text" placeholder="Write a comment..." v-model="commentText">
			<fas class="iconSendComment" icon="chevron-circle-right" @click.prevent="commentPost" ></fas>
		</div>

		<div v-show="comments.length > 0" v-for="comment in comments" :key="comment.id">
			<Comment :authorFname="comment.User.firstName" :authorLname="comment.User.lastName" :authorId="comment.userId" :commentId="comment.id" :commentText="comment.content" :nbLikes="comment.likes" @deleteComment="delComment" @likeComment="likeTheComment">
			</Comment>
		</div>

	</div>
</template>

<script>
import moment from 'moment';
import Comment from '../components/Comment.vue';
import { useStore } from 'vuex';
import { ref, onUpdated } from 'vue';
import { useSwal } from "../useSwal";


export default {
	components: { Comment },
	name: 'Post',
	props: {
		'postId': Number,
		'authorId': Number,
		'authorFname': String,
		'authorLname': String,
		'publicationDate': String,
		'postTitle': String,
		'postContent': String,
		'nbLikes': Number,
		'comments': Array,
		'usersLiked': Array,
	},
	emits: ['likeApost', 'deletePost', 'commentApost', 'deleteAcomment', 'likeAcomment'],
	setup(props, context) {
		// Données et variables
		const store = useStore();
		const formattedPublicationDate = moment(props.publicationDate).format('DD/MM/YYYY');
		let authorEQuser = ref(false);
		let like = ref(0);
		let hasLiked = ref();
		let writingComment = ref(false);
		let commentText = ref("");
		const firstField = ref(null);

		// Focus de la souris sur le 1er champ texte
		onUpdated( () => {
			firstField.value.focus();
		});


		// Affichage du bouton Supprimer un post
		if (props.authorId === store.state.user.id) {
			authorEQuser.value = true;
		}

		// Alert pour la suppression d'un post
		const Swal = useSwal();

		function showAlert() {
			Swal.fire({
				title: 'Deleting Post',
				text: 'Are you sure you want to delete this post?',
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Yes, delete',
				icon: 'question',
				focusConfirm: false,
			}). then((result) => {
				if (result.isConfirmed) {
					del();
				}
			})
		}

		// Suppression d'un post
		function del() {
			const id = props.postId
			context.emit('deletePost', id);
		}

		// Si a déjà aimé le post quand on arrive sur la page
		if ( props.usersLiked.includes(store.state.user.id)) {
			hasLiked.value = true;
		} else {
			hasLiked.value = false;
		}

		// Aimer un post
		function likePost () {
			const postId = props.postId;
			
			if (hasLiked.value) {
				like.value = 0;
				hasLiked.value = false;
			} else {
				like.value = 1;
				hasLiked.value = true;
			}

			const data = {
				postId,
				like: like.value
			}
			context.emit('likeApost', data);
		}

		// Afficher sous le post l'input pour écrire un commentaire
		function triggerWritingComment() {
			if (writingComment.value === false ) {
				writingComment.value = true;
			} else {
				writingComment.value = false;
			}
		}

		// Écrire un commentaire
		function commentPost() {
			const postId = props.postId;
			const commentData = {
				postId: postId,
				content: commentText.value,
				userId : store.state.user.id
			}
			context.emit('commentApost', commentData);
			writingComment.value = false;
		}

		// Supprimer un commentaire
		function delComment(id) {
			context.emit('deleteAcomment', id);
		}
		
		// Aimer un commentaire
		function likeTheComment(data) {
			context.emit('likeAcomment', data);
		}


		return { formattedPublicationDate, authorEQuser, likePost, hasLiked, triggerWritingComment, writingComment, commentPost, commentText, showAlert, delComment, firstField, likeTheComment };

	}
}
</script>

<style lang="scss" scoped>

	.postContainer {
		margin-bottom: 25px;
		padding: 0 25px 10px;
		border-radius: 5px;
		box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
		// border: orangered 1px solid;
	}

	.postHeader {
		padding: 5px 10px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.leftSideHeader {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.userPicContainer {
				width: 50px;
				height: 50px;
				margin: 0 15px 0 0;
				border-radius: 50%;
				border: 1px red dashed;
			}
	
			.authorAndDate {
				p {
					margin: 0;
					font-size: 12px;
				}
				p:last-child {
					letter-spacing: 1px;
				}
			}
		}

		.rightSideHeader {
			button {
				border-radius: 3px;
				color: white;
				background-color: rgba(0, 0, 0, 0.5);
				height: 35px;
				z-index: 1;
				cursor: pointer;
				border: none;
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
				font-weight: bold;
			}
		}
	}

	.postContent {
		padding: 0 10px;
		&_title {
			font-weight: bold;
			margin-top: 0;
		}
	}

	.postActionsContainer, .postNumbers {
		padding-top: 10px;
		width: 100%;
		margin: 0 auto;
		height: 45px;
		border-top: 1px solid grey;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

		.likeContainer a, .commentContainer a {
			display: flex;
			align-items: center;
			margin: 0 20px;
			
			p {
				display: inline-block;
				margin: 0;
			}
			.icon-action {
				margin-right: 5px;
			}
			
			&:hover {
				color: rgb(230, 57, 20);
				cursor: pointer;
			}
		}
	}
	.postNumbers {
		justify-content: space-between;
		p {
			margin: 0 10px;
			.icon {
				margin-right: 8px;
			}
		}
	}
	.orange {
		color: rgb(230, 57, 20);
	}

	.commentInputContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		// border: 1px solid green;

		.userPicContainer {
			width: 35px;
			height: 35px;
			margin: 0;
			border-radius: 50%;
			border: 1px red dashed;
		}

		input {
			width: 85%;
			height: 35px;
			margin-left: 5px;
			background-color: rgba(21, 158, 122, 0.32);
			font-size: 13px;
			border-radius: 20px;
			border: none;
			outline: none;
			padding-left: 10px;

			&:focus {
				box-shadow: 1px 1px 5px black;
				// border: black 1px solid;
			}
		}

		.iconSendComment {
			width: 35px;
			height: 25px;
			cursor: pointer;
			color: rgb(230, 57, 20);
		}
	}

</style>