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

			<div class="rightSideHeader" v-show="authorEQuser">
				<button class="button" @click="showAlert">Delete</button>
			</div>

		</div>

		<div class="postContent">
			<p class="postContent_title">{{ postTitle }}</p>
			<p class="postContent_content">{{ postContent }}</p>
		</div>

		<div class=postActionsContainer>
			<p>blaval</p>
			<!-- Like component -->
			| 
			<p>{{ nbComments || NoComment }} comments</p>
		</div>

	</div>
</template>

<script>
import moment from 'moment';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useSwal } from "../useSwal";


export default {
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
		'nbComments': Number,
	},
	emits: ['deletePost'],
	setup(props, context) {
		// Données et variables
		const store = useStore();
		const formattedPublicationDate = moment(props.publicationDate).format('DD/MM/YYYY');
		let authorEQuser = ref(false);
		const NoComment = 0;

		// Affichage de 0 si aucun commentaire sous le post
		if (props.nbComments === null ) {
			return NoComment;
		}

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

		return { formattedPublicationDate, authorEQuser, NoComment, showAlert};

	}
}
</script>

<style lang="scss" scoped>

	.postContainer {
		margin-bottom: 25px;
		padding: 0 15px 10px;
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

	.postActionsContainer {
		padding-top: 10px;
		width: 100%;
		margin: 0 auto;
		height: 45px;
		border-top: 1px solid grey;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>