import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
    <p className={css.lastUpdated}>Dernière mise à jour: 15 mars 2019</p>
    <h2>I PRESENTATION DE LA SOCIETE</h2>
      <p>
Le site est édité par la société SAS REGENERATE - SAS au capital de 120 100€, inscrite au RCS de Paris sous
le N°B 844 818 948, dont le siège social est 147 RUE OBERKAMPF 75011 PARIS France et ayant pour objet
social la réalisation et l’exploitation de sites internet, ainsi que la mise à disposition de contenus auprès du
public.
<br/><br/>L’éditeur en chef du site n’est pas un médecin ou un professionnel de santé.</p>
    <h2>II CONDITIONS GENERALES D'UTILISATION</h2>
      <h2>2.1 L’Objet du Site</h2>
      <p>
        Le présent site a pour objet de permettre à ses « utilisateurs internautes » de prendre rendez-vous en ligne auprès
        de professionnels référencés sur le site et avec lesquels une relation contractuelle a été mise en place.
        <br/><br/>Les informations fournies sur le site guerizen.com sont destinées à améliorer, non à remplacer, la relation directe
        entre l’utilisateur (ou visiteur du site) et les praticiens.
        <br/><br/>Son utilisation par les utilisateurs internautes implique l’adhésion aux présentes conditions.
      </p>

      <h2>2.2 Usage Personnel</h2>
      <p>
        (a) L’utilisation de ce site est exclusivement réservée à un usage personnel par les « utilisateurs
        internautes ».
        <br/>(b) Le site est intégralement protégé sur le plan juridique et notamment la marque, le logo, les photos,
        les informations sur les thérapeutes, les articles et tous les signes distinctifs du site; toute utilisation a
        d’autres fins que l’objet visé en 2.1 constitue une contrefaçon et/ou un acte de concurrence déloyale ou
        parasitaire susceptible d’engager la responsabilité civile et pénale du contrefacteur.
      </p>

      <h2>2.3 Adhésion aux Présentes Conditions</h2>
      <p>
        Les utilisateurs internautes adhérent aux présentes conditions tout en sachant que les informations contenues
        dans le site n’ont pas un caractère contractuel et que la société SAS REGENERATE se réserve la possibilité de
        modifier de plein droit à tout moment et sans préavis l’accès au site, sa structure et son contenu ainsi que les
        termes des présentes conditions générales d’utilisation.
      </p>

      <h2>2.4 Usage du Site Exclusivement Limité</h2>
      <p>
        L’usage de ce site est exclusivement réservé à l’objet défini au point 2.1; les « utilisateurs internautes » ne
        peuvent en aucune façon chercher à s’approprier les informations figurant sur le site en tout ou partie sous
        quelque forme que ce soit, quel qu’en soit l’usage dans la mesure ou l’utilisation est strictement limitée à l’objet
        qui figure au point 2.1.
      </p>
      <h2>2.5 Données Personnelles</h2>
      <p>
        L’acceptation des présentes conditions générales d’utilisation implique nécessairement que » L’utilisateur
        internaute » indique ses références personnelles pour pouvoir bénéficier des services du site » guerizen.com »
        définis au point 2.1.
        <br/><br/>Il en est informé et utilise le site librement ; il s’oblige à ne communiquer et à n’inscrire sur le site que des
        informations véridiques, sincères, régulières et fideles sur ses coordonnées et sur ses besoins.
        <br/><br/>Les informations fournies par « L’utilisateur internaute » pourront en outre, sous réserve de l’accord de «
        L’utilisateur internaute » concerné, être communiquées aux partenaires de la société SAS REGENERATE.
        <br/><br/>Il bénéficie d’un droit d’accès et de rectification dans le cadre des dispositions de la loi informatique et liberté du
        6 janvier 1978 et des textes subséquents, qu’il peut exercer en écrivant à 147 rue Oberkampf, 75011 PARIS.
        <br/><br/>Les échanges par email entre le visiteur et les modérateurs concernent des informations sur la prise de rendez-
        vous uniquement et en aucun cas des informations sur la santé de l’utilisateur.
        <br/><br/>Les informations personnelles des utilisateurs stockées dans la base de données du site «guerizen.com » sont : le
        nom, le prénom et le sexe de l’utilisateur voulant prendre rendez-vous par l’intermédiaire du dit site ; l’adresse e-
        mail de l’utilisateur, nous permettant de lui envoyer des informations sur ses rendez-vous pris ; l’ensemble des
        rendez-vous pris (par l’intermédiaire de notre site) sont enregistrés dans la base de données (praticien concerné,
        utilisateur concerné, date, heure, état du RDV) ; l’adresse de recherche de l’utilisateur (si celui-ci en fourni une) ;
        le numéro de téléphone de l’utilisateur, nous permettant de le contacter en cas de problème. ; Les témoignages
        éventuels des utilisateurs. (Les témoignages sont visibles sur le site).
        <br/><br/>L’ensemble de ses données sont stockées dans une base de données sur un serveur hébergé par la société
        Clevercloud.
        <br/><br/>Cette base de données peut être consultée uniquement par le personnel de la société SAS REGENERATE.
        <br/><br/>Des statistiques anonymes sont établies sur les visites, les pages consultées, la provenance des utilisateurs et le
        taux de satisfaction des utilisateurs de notre site internet.
        <br/><br/>Ses statistiques ne sont pas utilisées par des sociétés tierces. Des cookies sont utilisés, contenant le nom de
        l’utilisateur, son prénom, son numéro de téléphone, son e-mail, son adresse de recherche.
      </p>
      <h2>2.6 Respect du Site</h2>
      <p>
        « L’utilisateur internaute » :
        <br/><br/>Respecte le ou les processus de suivi d’informations figurant sur le site pour pouvoir bénéficier du service défini
        au point 2.1.
        <br/><br/>S’engage à n’intervenir sur le site que s’il recherche le service figurant au point 2.1.
        <br/><br/>S’interdit :
        <br/>(a) d’entrer dans le site des informations fausses ou inexactes ou encore qui ne lui seraient pas personnelles
sans y avoir été expressément autorisé par la personne qu’il représente.
        <br/>(b) de porter sur le site des mentions contraires à la réglementation en vigueur.
        <br/>(c) de réserver des faux rendez-vous ou des rendez-vous à partir d’informations erronées
        <br/>(d) de créer des liens avec d’autres sites sans autorisation préalable émanant de la société
        SAS REGENERATE.
        <br/>(e) de porter sur le site des informations pouvant directement ou indirectement être liées ou reliées a
        d’autres sites ou systèmes et notamment sur lesquels figureraient des données contraires aux
        réglementations en vigueur et tout particulièrement celles visant à protéger les mineurs. Tous les
        utilisateurs de la plate-forme ainsi que les modérateurs doivent se comporter en tout temps avec respect
        et honnêteté.
      </p>
      <h2>2.7 Limitation de l’Utilisation</h2>
      <p>
        « L’utilisateur internaute » est limité à deux demandes par jour et par métier ; au-delà « L’utilisateur internaute »
        se rapprochera des responsables du site pour que ses besoins entrant dans le champ d’application du point 1.1
        puissent être traités.
      </p>
      <h2>2.8 Droits d’Auteur</h2>
      <p>
        Toutes les informations figurant sur le site bénéficient de la protection du Code de la Propriété Intellectuelle.
        <br/><br/>Et des lors, « L’utilisateur internaute » ne peut en aucun cas utiliser et reproduire des informations y figurant.
      </p>
      <h2>2.9 Limitation de Responsabilité</h2>
      <p>
        « L’utilisateur internaute » est informé que le Site est accessible 24H sur 24 et 7 jours sur 7, à l’exception des cas
        de force majeure, difficultés informatiques ou difficultés des réseaux de télécommunications.
        <br/><br/>(a) La société SAS REGENERATE met tout en ouvre pour offrir à « L’utilisateur internaute » des informations
        vérifiées, mais elle ne saurait être tenue pour responsable des erreurs d’information ou d’une absence de
        disponibilité des informations contenues sur son site, ni des dommages directs ou indirects pouvant en résulter.
        De la même manière, la société SAS REGENERATE met tout en ouvre pour offrir à « L’utilisateur internaute »
        des informations vérifiées sur les prestataires de service, mais elle ne saurait être tenue pour responsable de la
        qualité des informations ou plus généralement de toute fausse information sur les produits, services et/ou tarifs
        communiqués par ce dernier, ou bien d’une absence de disponibilité de sa part. La société SAS REGENERATE
        décline toute responsabilité quant à ces informations et n’en garantit ni la véracité ni l’exhaustivité. En
        conséquence, « L’utilisateur internaute » est encouragé à prendre contact directement avec le prestataire de
        services, avant le rendez-vous correspondant demandé sur le site » guerizen.com «, pour obtenir ou confirmer
        tous les éléments d’information qui lui semblent importants, notamment mais pas exclusivement les informations
        d’ordre tarifaire.
        <br/><br/>(b) Malgré tous ses efforts pour qualifier au mieux « L’utilisateur internaute » ainsi que sa demande de rendez-
        vous via son site, la société SAS REGENERATE ne saurait être tenue pour responsable de toute fausse
        information et/ou demande de rendez-vous communiquée au prestataire de service, ni des dommages directs ou
        indirects pouvant en résulter pour l’exploitation de son activité commerciale. « L’utilisateur internaute » garantit
        que sa demande de rendez-vous correspond à un besoin réel et s’engage à communiquer des informations
        sincères et véritables au Prestataire.
        <br/><br/>(c) La prestation de prise de rendez-vous de la part de la société SAS REGENERATE est strictement limitée a
        mettre en relation « L’utilisateur internaute » avec des prestataires de services référencés ou regroupés
        contractuellement ou sous une forme sociétaire pour fournir la prestation recherchée. Ainsi, le service fourni par
        la société SAS REGENERATE est strictement limité à la mise en relation avec ces professionnels regroupés par
        les partenaires commerciaux de la société L’accueil web avec lesquels a été mise en place une relation
        contractuelle.
        <br/><br/>(d) « L’utilisateur internaute » est expressément averti qu’en aucun cas la société SAS REGENERATE n’est
        responsable de la prestation de service rendue par les prestataires de services professionnels. Les clients seront
        avisés que ni le site guerizen.com ni SAS REGENERATE ne pourront être tenus responsables des prestations,
        interventions et manipulations physiques ou morales d’aucune sorte réalisées par le prestataire de service auprès
        des clients de guerizen.com. En cas de litige avec un client, la responsabilité seule du prestataire de service sera
        engagée. La société SAS REGENERATE n’intervient pas dans les négociations menées par la suite entre «
        L’utilisateur internaute » et le prestataire de services, et ne pourra en aucun cas être tenue pour responsable des
        différends qui pourraient survenir entre eux dans les négociations et/ou la fourniture des prestations. «
        L’utilisateur internaute » reconnaît être seul responsable du choix du prestataire de service et décharge la société
        SAS REGENERATE de tout devoir de conseil dans le choix de son prestataire ; il fait son affaire des
        conséquences éventuelles de son choix ; la société SAS REGENERATE ne pourra en aucun cas être tenue pour
        responsable de tout dommage direct ou indirect causé par la vente et/ou la réalisation de la prestation convenue
        suite à l’intermédiation. Il appartient à « L’utilisateur internaute » de vérifier les informations communiquées par
        le prestataire de service via le site » guerizen.com » pour s’assurer de la compétence de ce dernier pour mener a
        bien les prestations proposées. La société SAS REGENERATE décline toute responsabilité civile et/ou pénale
        quant aux conséquences directes et indirectes de sa mise en relation entre « utilisateurs internautes » et
        prestataires de services. La société SAS REGENERATE précise en outre que certains de ces professionnels
        appartiennent à des professions réglementées, et d’autres professionnels sont regroupés contractuellement ou
        dans des structures juridiques qui assurent l’auto régulation de leurs prestations sur le plan qualitatif et
        déontologique.
        <br/><br/>(e) D’une façon générale, la société SAS REGENERATE a sélectionné des organisations de professionnels qui
        assurent au mieux la sécurité des « utilisateurs internautes » et la qualité des prestations mais en aucun cas la
        société SAS REGENERATE ne peut être tenu pour responsable de la prestation de ces professionnels ou de leur
        comportement.
        <br/><br/>(f) « L’utilisateur internaute «, en cas de difficulté, informera la société SAS REGENERATE avec un dossier
        motivé pour lui permettre de rechercher avec l’organisation à laquelle appartient ce prestataire une solution
        amiable ; mais en tout état de cause, « L’utilisateur internaute » ne peut rechercher la responsabilité juridique de
        la société SAS REGENERATE du fait du service défectueux réalisé par les prestataires ou le comportement du
        prestataire.
        <br/><br/>(g) Enfin, la société SAS REGENERATE met tout en ouvre pour offrir à « L’utilisateur internaute » un site
        sécurisé, notamment en matière d’absence de virus sur son site. Il appartient cependant à « L’utilisateur
        internaute » de protéger son matériel ou réseau informatique en se dotant d’un anti-virus qui sera régulièrement
        mis à jour par « L’utilisateur internaute «. La société SAS REGENERATE ne pourra en aucun cas être tenue
        pour responsable d’une quelconque intrusion de virus dans le matériel informatique de « L’utilisateur internaute
        », ni des dommages directs ou indirects pouvant en résulter. Par ailleurs, les liens hypertextes mis en place dans
        le cadre du présent site en direction d’autres ressources présentes sur le réseau Internet ne sauraient engager la
        responsabilité de la société SAS REGENERATE. Il appartiendra à « L’utilisateur internaute » de vérifier la
        qualité des informations communiquées sur ces autres plateformes, ainsi que leurs conditions générales
        d’utilisation. « L’utilisateur internaute » est informé que la société SAS REGENERATE ou d’autres sites
        partenaires sont susceptibles de placer des cookies et des actions Tag sur son ordinateur dans le but de mesurer
        l’efficience du service proposé et d’en faciliter l’utilisation. Toutes les informations collectées par ces entreprises
        via les cookies ou les actions Tag sont entièrement anonymes. » L’utilisateur internaute » a cependant la
        possibilité de refuser les cookies ou les actions Tag. Il lui suffit pour cela de modifier les paramètres de son
        navigateur Internet. Dans ce cas, il se peut qu’il ne puisse bénéficier de la totalité des fonctions et des services
        proposés sur le présent site.
      </p>
      <h2>III MODALITES ET CONDITIONS FINANCIERES DE LA PRESTATION</h2>
      <h2>3.1 Majorité de « L’utilisateur internaute »</h2>
      <p>
      « L’utilisateur internaute » déclare qu’il est majeur et à ce titre susceptible de s’engager pour bénéficier de la
prestation » guerizen.com ».  </p>
<h2>3.2 Enregistrement de la Commande</h2>
      <p>
      Le processus de la commande figurant dans le site «guerizen.com » conduit « L’utilisateur internaute » à suivre
le processus de validation de sa commande dans les conditions suivantes :
<br/>(a) La validation de la commande n’intervient qu’après avoir rempli la partie « confirmation de votre
demande de rdv »
<br/>(b) La commande ne sera considérée comme valable qu’après enregistrement du » clic d’acceptation « qui
intervient à la page écran» confirmation de votre demande de rdv ».

<br/><br/>Ce « clic d’acceptation » qui rend la commande irrévocable est assimilé à la signature manuscrite visée à l’article
1341 du Code Civil français.
<br/><br/>A partir de ce » clic d’acceptation «, « L’utilisateur internaute » reconnaît s’être engagé à recourir à un
prestataire de services proposé par le site » guerizen.com » et en conséquence accepter l’ensemble des modalités
et conditions de cette prestation qui figure sur les pages écran constituant le site » guerizen.com «.
  </p>

  <h2>3.3 Prix de la Prestation
 </h2>
      <p>
      « L’utilisateur internaute » devra s’acquitter du règlement du cout de la prestation lors de l’exécution de celle-ci,
directement auprès du prestataire avec lequel il a été mis en relation par le site «guerizen.com».
<br/><br/>« L’utilisateur internaute » déclare choisir librement les prestations payantes dont la demande d’intervention
passe par le site «guerizen.com ».
<br/><br/>« L’utilisateur internaute » s’engage à ce que les règlements soient effectués auprès des prestataires de service ;
il ne peut utiliser aucun moyen de paiement appartenant à des tiers sauf à y avoir été expressément autorisé
préalablement par écrit par ledit tiers.
  </p>
  <h2> IV LITIGES</h2>
<p>
      
Toute difficulté, différend ou litige qui pourrait naître à l’occasion de l’utilisation du site » guerizen.com » releve
de la compétence exclusive du Tribunal de Commerce de Paris.  </p>

    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
