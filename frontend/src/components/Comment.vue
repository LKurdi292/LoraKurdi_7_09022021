<template>
	<div class="commentContainer">

		<div class="userPicContainer">

		</div>

		<div class="commentContent">
			<div class="commentContent__header">
				<p>{{ authorFname }} {{ authorLname }}</p>

				<div class="rightSideHeader" v-show="authorEQuser || $store.state.user.isAdmin">
					<fas icon="trash" @click="deleteAcomment" title="Delete"></fas>
				</div>
			</div>

			<p class="commentContent__text">{{ commentText }}</p>
			
			<!-- Affichage des likes commentaires -->
			<div class="likeContainer">
				<a :class="{orange: hasLiked}" @click.prevent="likeAcomment" title="Like or dislike">
					<fas class="icon-action" icon="thumbs-up"></fas>
				</a>
				<p>0</p>
				<!-- <p>{{ usersLiked.length }}</p> -->
			</div>
		</div>

	</div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
	name: 'Comment', 
	props: {
		'commentId': Number,
		'authorId': Number,
		'authorFname': String,
		'authorLname': String,
		'commentText': String,
		'nbLikes': Number,
		'usersLiked': Array
	},
	emits: ['deleteComment', 'likeComment'],
	setup(props, context) {
		// Données et variables
		const store = useStore();
		let authorEQuser = ref(false);
		let like = ref(0);
		let hasLiked = ref(false);
		
		// Affichage du bouton Supprimer un commentaire
		if (props.authorId === store.state.user.id) {
			authorEQuser.value = true;
		}

		// Supprimer un commentaire
		function deleteAcomment() {
			const id = props.commentId;
			context.emit('deleteComment', id);
		}

		// Si user a déjà aimé le commentaire quand arrive sur la page
		// if ( props.usersLiked.includes(store.state.user.id)) {
		// 	hasLiked.value = true;
		// } else {
		// 	hasLiked.value = false;
		// }

		// Aimer un commentaire
		function likeAcomment() {
			const id = props.commentId;

			if (hasLiked.value) {
				like.value = 0;
				hasLiked.value = false;
			} else {
				like.value = 1;
				hasLiked.value = true;
			}

			const data = {
				id,
				userId: store.state.user.id,
				like: like.value
			}

			context.emit('likeComment', data);
		}

		return { authorEQuser, deleteAcomment, likeAcomment };


	},
}
</script>


<style lang="scss" scoped>
	.commentContainer {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 25px auto;


		.userPicContainer {
			width: 35px;
			height: 35px;
			margin: 0;
			border-radius: 50%;
			border: 1px red dashed;
		}
	}

	.commentContent {
		margin-left: 10px;
		width: 90%;
		padding: 10px 15px;
		min-height: 50px;
		border-radius: 25px;
		background-color: rgba(218, 204, 204, 0.6);
		position: relative;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 10px;
			position: relative;

			p {
				margin: 0;
				font-size: 12px;
				font-weight: bold;
			}

			.rightSideHeader {
				display: flex;
				justify-content: center;
				align-items: center;

				.fa-trash {
					width: 20px;
					position: absolute;
				}

				:hover {
					cursor: pointer;
				}
			}
		}

		&__text {
			margin: 0;
			height: auto;
			display: flex;
			flex-wrap: wrap;
		}
	}

	.likeContainer {
		position: absolute;
		bottom: -5px;
		right: -0.5%;
		display: flex;
		align-items: center;

		&:hover {
			color: rgb(230, 57, 20);
		}
		
		a {
			cursor: pointer;

		}

		p {
			margin: 0 0 0 3px;
		}
	}

	.orange {
		color: rgb(230, 57, 20);
	}
</style>