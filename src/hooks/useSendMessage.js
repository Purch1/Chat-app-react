import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages, selectedConversation] = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Contend-Types": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = response.json();

      setMessages([...messages, data]);

      if (data.error) throw new Error(data.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
