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
				<button class="button" @click="() => deletePost(post.id)">Supprimer</button>
				<button class="button" @click="() => toggle(post)">Modifier</button>
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
			<p>blalva</p>
			<!-- Comment component -->
		</div>

	</div>
</template>

<script>
import moment from 'moment';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
	name: 'Post',
	props: {
		'authorId': Number,
		'authorFname': String,
		'authorLname': String,
		'publicationDate': Date,
		'postTitle': String,
		'postContent': String,
		'nbLikes': Number,
		'nbComments': Number,
	},
	setup(props) {
		// Données et variables
		const store = useStore();
		const formattedPublicationDate = moment(props.publicationDate).format('DD/MM/YYYY');
		let authorEQuser = ref(false);


		// Affichage des boutons Supprimer et Modifier un post
		if (props.authorId === store.state.user.id) {
			authorEQuser.value = true;
		}



		return { formattedPublicationDate, authorEQuser};

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
		// position: relative;

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
				margin: 0 10px;
				border-radius: 3px;
				border: 1px black solid;
				height: 25px;
				background-color: whitesmoke;
				z-index: 1;
				cursor: pointer;
				right: 0;
				top: 0;
			}
		}
	}

	.postContent {
		padding: 0 10px;
		&_title {
			font-weight: bold;
			margin-top: 0;
		}

		// &_content {

		// }
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