import api from './api';

export const whatsapp = {
  sendNotification: async (phoneNumber, message) => {
    try {
      const response = await api.post('/notifications/whatsapp', {
        phoneNumber,
        message,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
      throw error;
    }
  },

  sendOrderConfirmation: async (orderId, phoneNumber) => {
    try {
      const response = await api.post('/notifications/whatsapp/order', {
        orderId,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      throw error;
    }
  },

  sendPaymentConfirmation: async (paymentId, phoneNumber) => {
    try {
      const response = await api.post('/notifications/whatsapp/payment', {
        paymentId,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending payment confirmation:', error);
      throw error;
    }
  },

  sendReferralNotification: async (referralId, phoneNumber) => {
    try {
      const response = await api.post('/notifications/whatsapp/referral', {
        referralId,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending referral notification:', error);
      throw error;
    }
  },
}; 