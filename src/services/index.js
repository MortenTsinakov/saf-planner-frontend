// Api services
export { default as apiClient } from 'services/api/ApiClient';
export { default as AxiosErrorHandler } from 'services/api/AxiosErrorHandler';

// Auth services
export { 
    signInService,
    signOutService,
    signUpService
} from 'services/auth/AuthService';

// Project services
export {
    fetchProjectByIdService,
    fetchUserProjectsService,
    fetchSharedProjectsService,
    createProjectService,
    updateProjectTitleService,
    updateProjectDescriptionService,
    updateProjectEstimatedLengthService,
    deleteProjectService,
    shareProjectService,
} from 'services/project/ProjectService';

// Fragment services
export {
    fetchFragmentsService,
    createFragmentService,
    updateFragmentOnTimelineStatusService,
    updateFragmentShortDescriptionService,
    updateFragmentLongDescriptionService,
    updateFragmentDurationService,
    moveFragmentService,
    deleteFragmentService,
} from 'services/fragment/FragmentService';

// Label service
export {
    createLabelService,
    updateLabelService,
    deleteLabelService,
    attachLabeltoFragmentService,
    attachLabelsToFragmentService,
    removeLabelFromFragmentService,
} from 'services/label/LabelService';

// Image service
export {
    fetchImageService,
    fetchSharedProjectImageService,
    uploadImageService,
    deleteImageService,
} from 'services/image/ImageService';

// User service
export {
    searchUsersService,
} from 'services/user/UserService';

// Shared project
export {
    fetchSharedProjectService,
    fetchSharedProjectFragmentsService,
    stopSharingProjectService,
    commentFragmentService,
    editCommentService,
    deleteCommentService,
} from 'services/shared-project/SharedProjectService';

// Screenplays
export {
    fetchScreenplayService,
    createScreenplayService,
    updateScreenplayService,
    deleteScreenplayService,
    downloadScreenplayAsPDFService,
} from 'services/screenplay/ScreenplayService';