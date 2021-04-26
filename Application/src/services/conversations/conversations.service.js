import * as firebase from 'firebase';
import { getByRef } from '../utils/functions';

export const getConversations = async (userAuthenticatedId) => {
  const conversations = await firebase
    .firestore()
    .collection('conversations')
    .where('members', 'array-contains', userAuthenticatedId)
    .orderBy('lastMessage.send', 'DESC')
    .get();

  return Promise.all(
    conversations.docs.map(async (doc) => {
      const { lastMessage, members } = doc.data();
      const [recipientId] = members.filter(
        (memberId) => memberId !== userAuthenticatedId
      );

      const recipientData = (await getByRef('users', recipientId)).data();

      return { id: doc.id, lastMessage, recipient: recipientData };
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

export const postMessage = (conversationId, userAuthenticatedId) => {};
