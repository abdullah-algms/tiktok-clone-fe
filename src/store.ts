import { create } from "zustand";

interface UseStore {
  activeTab: string;
  setActiveTab: (tabIndex: string) => void;
  thumbnail: string;
  setThumbnail: (thumbUrl: string) => void;
  isLoadingUpload: boolean;
  setIsLoadingUpload: (loading: boolean) => void;
  uploadMessage: string;
  setUploadMessage: (message: string) => void;
  isUploadDone: boolean;
  setIsUploadDone: (upload: boolean) => void;
  showComment: boolean;
  setShowComment: (comment: boolean) => void;
  postIdComment: string;
  setPostIdComment: (id: string) => void;
}

export const useStore = create<UseStore>((set) => ({
  activeTab: "post",
  setActiveTab: (tab) => set({ activeTab: tab }),
  thumbnail: "/",
  setThumbnail: (url) => set({ thumbnail: url }),
  isLoadingUpload: false,
  setIsLoadingUpload: (loading) => set({ isLoadingUpload: loading }),
  uploadMessage: "",
  setUploadMessage: (message) => set({ uploadMessage: message }),
  isUploadDone: false,
  setIsUploadDone: (upload) => set({ isUploadDone: upload }),
  showComment: false,
  setShowComment: (comment) => set({ showComment: comment }),
  postIdComment: "",
  setPostIdComment: (id) => set({ postIdComment: id }),
}));
