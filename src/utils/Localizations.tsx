import LocalizedStrings, {GlobalStrings} from 'react-native-localization';
import STATUS_CODES from '../../backend/models/status';
//GENERIC_ERROR,
// USER_NOT_FOUND,
// INVALID_NUMBER,
// SENT_CODE,
// NUMBER_NOT_EXIST,
// ERROR_SENDING_CODE,
// TOO_MANY_ATTEMPTS,
// CODE_DENIED,
// CODE_EXPIRED,
// CODE_FAILED,
// ALREADY_REPORTED,
// MISMATCHED_IMAGE,
export const Localizations = new LocalizedStrings({
  es: {
    fire: 'Fuego',
    flood: 'Inundación',
    avalanche: 'Avalancha',
    error: 'Error',
    success: '¡Éxito!',
    cancel: 'Cancelar',
    grant: 'Conceder',
    safe: 'Segura',
    risk: 'de Riesgo',
    danger: 'de Peligro',
    risk_only: 'Riesgo',
    danger_only: 'Peligro',
    report: 'Reporta',
    evidence: 'Evidencia',
    type: 'Tipo',
    GENERIC_ERROR: 'Se ha producido un error',
    USER_NOT_FOUND: 'Ese usuario no existe',
    INVALID_NUMBER: 'Ingrese un número de teléfono válido',
    SENT_CODE: 'Ya se ha enviado un código a ',
    NUMBER_NOT_EXIST: 'Ese número no existe',
    ERROR_SENDING_CODE: 'Hubo un error al enviar el código',
    TOO_MANY_ATTEMPTS: 'Ha intentado demasiadas veces, espere 5 minutos',
    CODE_DENIED: 'El código es incorrecto',
    CODE_EXPIRED: 'El código ha caducado',
    CODE_FAILED: 'Hubo un error al enviar el código',
    ALREADY_REPORTED: '¡Ya ha reportado de un desastre!',
    MISMATCHED_IMAGE: 'La imagen no contiene un {0}',
    NO_CONNECTION:
      'Hubo un error al conectarse al servidor, verifique su conexión a Internet.',
    loginButton: 'Entrar',
    enterCodeTitle: 'Ingrese el código',
    enterCodeDesc: 'Ingrese el código de verificación enviado a ',
    selectCountryCode: 'Seleccione su código de país',
    activateLocationTitle: 'Activar ubicación',
    activateLocationDesc:
      'Niveles De Niveles necesita tu ubicación precisa para comprobar automáticamente si estás en peligro.',
    activateCameraTitle: 'Activar cámara',
    activateCameraDesc:
      'Niveles De Niveles necesita su cámara para tomar una foto del incidente.',
    homeNoLocation:
      'Niveles De Niveles necesita su ubicación precisa para funcionar. ¡Haga clic aquí para cambiar los permisos!',
    recommendationsForZoneTitle: 'Recomendaciones Zona {0}',
    recommendationsForSafe:
      'Se encuentra en una zona segura, ¡no hay nada de qué preocuparse!',
    recommendationsForRisk:
      'Se encuentra en una zona de riesgo, asegúrese de tener un botiquín de primeros auxilios a mano y establezca una ruta de evacuación.',
    recommendationsForDanger:
      'Se encuentra en una zona de peligro, evacúe lo antes posible.',
    riskMeter: '¡Se encuentra en una Zona {0}!',
    photo: 'Foto',
    takePhoto: 'Tomar una foto',
    state: 'Estado',
    missingInformationTitle: 'Información faltante',
    missingInformationDesc: '¡Por favor complete la evidencia!',
    advice: '¿Qué puede hacer?',
    ourSensors: 'Nuestros sensores',
    noSensorsNear: 'No hay sensores cerca de usted!',
    phoneNumber: 'Número de teléfono',
    logoutTitle: 'Cerrar sesión',
    logoutDesc: '¿Está seguro de que desea cerrar sesión?',
    logout: 'Cerrar sesión',
    sending: 'Enviando',
    sensorType: 'Sensor de {0}',
    radius: 'Radio',
    activateNotificationsTitle: 'Activar Notificaciones',
    activateNotificationsDesc:
      '¡Niveles De Niveles le gustaría enviarle notificaciones para alertarlo automáticamente si se encuentra en una zona segura, de riesgo o peligrosa!',
    activateBackgroundLocationTitle: 'Ubicación de Fondo',
    activateBackgroundLocationDesc:
      'Niveles De Niveles desea acceder a tu ubicación en segundo plano para enviarte notificaciones si tu seguridad está en riesgo. ¡Puedes activar esto editando los permisos de ubicación de Niveles De Niveles!',
      moreInformationSafe: 'Lineas de emergencia \
      111 Atención de Desastres \
      123 Nacional Emergencias \
      132 Cruz Roja \
      119 Bomberos \
      Prepara kits de emergencia, identifica rutas de evacuación y realiza planes de emergencia. Mira la información de prevención completa aquí.',
      moreInformationRisk: "Lineas de emergencia \
      111 Atención de Desastres \
      123 Nacional Emergencias \
      132 Cruz Roja \
      119 Bomberos \
      Mantente alerta a las posibles noticias, identifica la zona de riesgo y rutas de evacuación, prepara kits y planes de emergencia. Mira la información de prevención completa: ",
      moreInformationDanger: 'Lineas de emergencia \
      111 Atención de Desastres \
      123 Nacional Emergencias \
      132 Cruz Roja \
      119 Bomberos \
      Manten la calma, identifica la ruta de evacuación más cercana lo antes posible y dirigete a ella. Revisa la información específica de cada desastre aquí.',
      moreInformation: 'Más Información',
      close: 'Cerrar'
  },
  en: {
    fire: 'Fire',
    flood: 'Flood',
    avalanche: 'Avalanche',
    error: 'Error',
    success: 'Success!',
    cancel: 'Cancel',
    grant: 'Grant',
    safe: 'Safe',
    risk: 'Risk',
    danger: 'Danger',
    risk_only: 'Risk',
    danger_only: 'Danger',
    report: 'Report',
    evidence: 'Evidence',
    type: 'Type',
    GENERIC_ERROR: 'An error has occured',
    USER_NOT_FOUND: 'That user does not exist',
    INVALID_NUMBER: 'Enter a valid phone number',
    SENT_CODE: 'A code has already been sent to ',
    NUMBER_NOT_EXIST: 'That number does not exist',
    ERROR_SENDING_CODE: 'There was an error sending the code',
    TOO_MANY_ATTEMPTS:
      'You have attempted too many times, please wait 5 minutes',
    CODE_DENIED: 'The code is incorrect',
    CODE_EXPIRED: 'The code has expired',
    CODE_FAILED: 'There was an error sending the code',
    ALREADY_REPORTED: 'You have already reported a disaster!',
    MISMATCHED_IMAGE: 'The image does not contain a {0}',
    NO_CONNECTION:
      'There was an error connecting to the server, please check your internet connection.',
    loginButton: 'Enter',
    enterCodeTitle: 'Enter the code',
    enterCodeDesc: 'Enter the verification code sent to ',
    selectCountryCode: 'Select your country code',
    activateLocationTitle: 'Activate Location',
    activateLocationDesc:
      'Niveles De Niveles needs your precise location to automatically check if you are in danger.',
    activateCameraTitle: 'Activate Camera',
    activateCameraDesc:
      'Niveles De Niveles needs your camera to take a photo of the incident.',
    homeNoLocation:
      'Niveles De Niveles needs your precise location to work. Click here to change permissions!',
    recommendationsForZoneTitle: '{0} Zone Recommendations',
    recommendationsForSafe:
      "You are in a safe zone, there's nothing to worry about!",
    recommendationsForRisk:
      'You are in a risk zone, make sure you have a first aid kit on hand and establish an evacuation route.',
    recommendationsForDanger:
      'You are in a danger zone, evacuate as soon as possible.',
    riskMeter: 'You are in a {0} zone!',
    photo: 'Photo',
    takePhoto: 'Take a Photo',
    state: 'State',
    missingInformationTitle: 'Missing Information',
    missingInformationDesc: 'Please fill out the evidence!',
    advice: 'What can you do?',
    ourSensors: 'Our Sensors',
    noSensorsNear: 'There are no sensors near you!',
    phoneNumber: 'Phone Number',
    logoutTitle: 'Logout',
    logoutDesc: 'Are you sure you want to logout?',
    logout: 'Logout',
    sending: 'Sending',
    sensorType: '{0} Sensor',
    radius: 'Radius',
    activateNotificationsTitle: 'Activate Notifications',
    activateNotificationsDesc:
      'Niveles De Niveles would like to send you notifications to automatically alert you if you are in a safe, risk, or danger zone!',
    activateBackgroundLocationTitle: 'Background Location',
    activateBackgroundLocationDesc:
      'Niveles De Niveles would like to access your background location to send you notifications if your safety is at risk! You can activate this by editing the location permissions for Niveles De Niveles!',
    moreInformationSafe: 'Emergency Lines \
    111 Disaster Response \
    123 National Emergencies \
    132 Red Cross \
    119 Firefighters \
    Prepare emergency kits, identify evacuation routes, and create emergency plans. See the complete prevention information here.',
    moreInformationRisk: '',
    moreInformationDanger: '',
    moreInformation: 'More Information',
    close: 'Close'
  },
  fr: {
    fire: 'Feu',
    flood: 'Inondation',
    avalanche: 'Avalanche',
    error: 'Erreur',
    success: 'Succès !',
    cancel: 'Annuler',
    grant: 'Accorder',
    safe: 'Sûr',
    risk: 'Risque',
    danger: 'Danger',
    risk_only: 'Risque',
    danger_only: 'Danger',
    report: 'Rapport',
    evidence: 'Preuve',
    type: 'Type',
    GENERIC_ERROR: "Une erreur s'est produite",
    USER_NOT_FOUND: "Cet utilisateur n'existe pas",
    INVALID_NUMBER: 'Entrez un numéro de téléphone valide',
    SENT_CODE: 'Un code a déjà été envoyé à ',
    NUMBER_NOT_EXIST: "Ce numéro n'existe pas",
    ERROR_SENDING_CODE: "Une erreur s'est produite lors de l'envoi du code",
    TOO_MANY_ATTEMPTS:
      'Vous avez tenté trop de fois, veuillez attendre 5 minutes',
    CODE_DENIED: 'Le code est incorrect',
    CODE_EXPIRED: 'Le code a expiré',
    CODE_FAILED: "Une erreur s'est produite lors de l'envoi du code",
    ALREADY_REPORTED: 'Vous avez déjà signalé une catastrophe!',
    MISMATCHED_IMAGE: "L'image ne contient pas de {0}",
    NO_CONNECTION:
      "Une erreur s'est produite lors de la connexion au serveur, veuillez vérifier votre connexion Internet.",
    loginButton: 'Entrer',
    enterCodeTitle: 'Entrer le code',
    enterCodeDesc: 'Entrez le code de vérification envoyé à ',
    selectCountryCode: 'Sélectionnez votre code de pays',
    activateLocationTitle: 'Activer la localisation',
    activateLocationDesc:
      'Niveles De Niveles a besoin de votre emplacement précis pour vérifier automatiquement si vous êtes en danger.',
    activateCameraTitle: 'Activer la caméra',
    activateCameraDesc:
      "Niveles De Niveles a besoin de votre caméra pour prendre une photo de l'incident.",
    homeNoLocation:
      'Niveles De Niveles a besoin de votre emplacement précis pour fonctionner. Cliquez ici pour modifier les autorisations!',
    recommendationsForZoneTitle: 'Recommandations Zone {0}',
    recommendationsForSafe:
      "Vous êtes dans une zone sûre, il n'y a rien à craindre !",
    recommendationsForRisk:
      "Vous êtes dans une zone à risque, assurez-vous d'avoir un kit de premiers soins à portée de main et établissez un itinéraire d'évacuation.",
    recommendationsForDanger:
      'Vous êtes dans une zone de danger, évacuez dès que possible.',
    riskMeter: 'Vous êtes dans une Zone de {0} !',
    photo: 'Photo',
    takePhoto: 'Prendre une photo',
    state: 'État',
    missingInformationTitle: 'Informations manquantes',
    missingInformationDesc: 'Veuillez remplir la preuve !',
    advice: 'Que pouvez-vous faire ?',
    ourSensors: 'Nos capteurs',
    noSensorsNear: "Il n'y a pas de capteurs à proximité !",
    phoneNumber: 'Numéro de téléphone',
    logoutTitle: 'Déconnexion',
    logoutDesc: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    logout: 'Déconnexion',
    sending: 'Envoi',
    sensorType: 'Capteur {0}',
    radius: 'Rayon',
    activateNotificationsTitle: 'Activer les Notifications',
    activateNotificationsDesc:
      'Niveles De Niveles souhaite vous envoyer des notifications pour vous alerter automatiquement si vous vous trouvez dans une zone sûre, à risque ou dangereuse!',
    activateBackgroundLocationTitle: 'Emplacement en arrière-plan',
    activateBackgroundLocationDesc:
      "Niveles De Niveles souhaite accéder à votre position en arrière-plan pour vous envoyer des notifications si votre sécurité est menacée. Vous pouvez l'activer en modifiant les autorisations de localisation des niveaux ! ",
    moreInformationSafe: '',
    moreInformationRisk: '',
    moreInformationDanger: '',
    moreInformationButton: 'More Information',
    close: 'Close'
  },
  zh: {
    fire: '火',
    flood: '洪水泛滥',
    avalanche: '走山',
    error: '错误',
    success: '成功!',
    cancel: '取消',
    grant: '授予',
    safe: '安全',
    risk: '风险',
    danger: '危险',
    risk_only: '风险',
    danger_only: '危险',
    report: '报告',
    evidence: '证据',
    type: '类型',
    GENERIC_ERROR: '出现错误',
    USER_NOT_FOUND: '该用户不存在',
    INVALID_NUMBER: '输入有效的电话号码',
    SENT_CODE: '已经发送代码至 ',
    NUMBER_NOT_EXIST: '号码不存在',
    ERROR_SENDING_CODE: '发送代码时出错',
    TOO_MANY_ATTEMPTS: '你尝试过很多次， 等五分钟',
    CODE_DENIED: '该代码无效',
    CODE_EXPIRED: '代码已过期',
    CODE_FAILED: '代码发送失败',
    ALREADY_REPORTED: '你已经报告了一场灾难!',
    MISMATCHED_IMAGE: '照片不包含 {0}',
    NO_CONNECTION: '连接到服务器时出错，请检查您的互联网连接。',
    loginButton: '登陆',
    enterCodeTitle: '输入代码',
    enterCodeDesc: '输入发送至的验证码',
    selectCountryCode: '选择您的国家/地区代码',
    activateLocationTitle: '激活位置',
    activateLocationDesc:
      'Niveles De Niveles 需要您的位置来自动检查您是否处于危险之中.',
    activateCameraTitle: '激活相机',
    activateCameraDesc:
      'Niveles De Niveles 需要您的精确位置来自动检查您是否处于危险之中。.',
    homeNoLocation:
      'Niveles De Niveles 需要您的精确位置才能发挥作用。 单击此处更改权限!',
    recommendationsForZoneTitle: '建议： {0}',
    recommendationsForSafe: '它位于安全区域，无需担心！',
    recommendationsForRisk: '您处于危险区域，请确保手头有急救箱并建立疏散路线.',
    recommendationsForDanger: '您处于危险区域，请尽快撤离.',
    riskMeter: '¡该地区的状态{0}!',
    photo: '照片',
    takePhoto: '拍照片',
    state: '状态',
    missingInformationTitle: '丢失的信息',
    missingInformationDesc: '请填写证据!',
    advice: '你能做什么?',
    ourSensors: "我们的'传感器",
    noSensorsNear: '没有近的传感器!',
    phoneNumber: '电话号码',
    logoutTitle: '登出',
    logoutDesc: '你确定要登出？',
    logout: '登出',
    sending: '发送',
    sensorType: '传感器{0}',
    radius: '半径',
    activateNotificationsTitle: '激活通知',
    activateNotificationsDesc:
      'Niveles De Niveles 希望向您发送通知，以便在您处于安全、风险或危险区域时自动提醒您!',
    activateBackgroundLocationTitle: '背景位置',
    activateBackgroundLocationDesc:
      'Niveles De Niveles 希望在后台访问您的位置，以便在您的安全受到威胁时向您发送通知。 您可以通过编辑级别位置权限来激活此功能！',
    moreInformationSafe: '安全\
    紧急热线 \
    111 灾害响应 \
    123 国家紧急情况 \
    132 红十字会 \
    119 消防员 \
    准备紧急救援包，确定撤离路线，制定紧急计划。在这里查看完整的预防信息。',
    moreInformationRisk: '',
    moreInformationDanger: '',
    moreInformationButton: 'More Information',
    close: 'Close'
    },
});
