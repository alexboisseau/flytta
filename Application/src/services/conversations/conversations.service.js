import * as firebase from 'firebase';
import { getByRef } from '../utils/functions';

export const getConversations = async (userAuthenticatedId) => {
  const conversations = await firebase
    .firestore()
    .collection('conversations')
    .where('members', 'array-contains', userAuthenticatedId)
    .orderBy('lastSend', 'desc')
    .get();

  return Promise.all(
    conversations.docs.map(async (doc) => {
      const { members, lastMessage, lastSend } = doc.data();
      const [recipientId] = members.filter(
        (memberId) => memberId !== userAuthenticatedId
      );

      let lastMessageData = null;
      if (lastMessage) {
        lastMessageData = (await lastMessage.get()).data().content;
      }

      const recipientData = (await getByRef('users', recipientId)).data();

      return {
        id: doc.id,
        lastMessage: lastMessage ? lastMessageData : null,
        lastSend,
        members,
        recipient: recipientData,
      };
    })
  );
};

export const getMessages = async (conversationId) => {
  const messages = await firebase
    .firestore()
    .collection(`conversations/${conversationId.trim()}/messages`)
    .get();

  return Promise.all(
    messages.docs.map(async (doc) => {
      const { content, recipient, send, sender } = doc.data();

      const recipientData = (await recipient.get()).data();
      const senderData = (await sender.get()).data();

      return {
        id: doc.id,
        content,
        recipient: recipientData,
        send,
        sender: senderData,
      };
    })
  );
};

export const postMessage = async (conversation, content, recipientId) => {
  const { members } = conversation;
  try {
    const lastMessage = await firebase
      .firestore()
      .collection('conversations')
      .doc(conversation.id)
      .collection('messages')
      .add({
        content,
        recipient: firebase.firestore().doc(`users/${recipientId.trim()}`),
        send: firebase.firestore.FieldValue.serverTimestamp(),
        sender: firebase
          .firestore()
          .doc(`users/${firebase.auth().currentUser.uid}`),
      });
    await firebase
      .firestore()
      .collection('conversations')
      .doc(conversation.id)
      .update({
        lastMessage: firebase
          .firestore()
          .collection(`conversations/${conversation.id}/messages`)
          .doc(lastMessage.id),
        members,
        lastSend: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (e) {
    console.error(e);
  }
};

export const createConversation = (recipientId) =>
  firebase
    .firestore()
    .collection('conversations')
    .add({
      lastMessage: null,
      lastSend: firebase.firestore.FieldValue.serverTimestamp(),
      members: [recipientId, firebase.auth().currentUser.uid],
    });
