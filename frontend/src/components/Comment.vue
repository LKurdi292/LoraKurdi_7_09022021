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
		</div>

		<!-- Affichage des likes? -->

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
	},
	emits: ['deleteComment'],
	setup(props, context) {
		// Données et variables
		const store = useStore();
		let authorEQuser = ref(false);
		//let like = ref(0);
		//let hasLiked = ref(false);
		
		// Affichage du bouton Supprimer un commentaire
		if (props.authorId === store.state.user.id) {
			authorEQuser.value = true;
		}

		// Supprimer un commentaire
		function deleteAcomment() {
			const id = props.commentId;
			context.emit('deleteComment', id);
		}

		return { authorEQuser, deleteAcomment };


	},
}
</script>


<style lang="scss" scoped>
	.commentContainer {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 15px auto;


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
		width: 100%;
		padding: 2%;
		border-radius: 25px;
		background-color: rgba(218, 204, 204, 0.6);

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 10px;

			p {
				margin: 0;
				font-size: 12px;
				font-weight: bold;
			}

			.rightSideHeader {
				display: flex;
				justify-content: center;
				align-items: center;

				:hover {
					cursor: pointer;
				}
			}
		}

		&__text {
			margin: 0;
			height: auto;
		}
	}
</style>