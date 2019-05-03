import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Dernière mise à jour: 15 mars 2019</p>

      <p>

Sécurité et protection des données personnelles

<h2>Avertissements</h2>
Le présent outil est mis à votre disposition gratuitement. L'outil se base sur des informations fondées sur
l’analyse professionnelle du cabinet en matière de conformité RGPD. Toutefois, la conformité étant un
processus dynamique et toute situation étant particulière, les informations transmises doivent être adaptées et
ne peuvent en aucun cas être considérées comme exhaustives ou exactes.
<br/><br/>Sauf à ce que vous demandiez une revue et validation par le Cabinet, le document généré est considéré
comme une simple information. En conséquence, vous êtes seul responsable des interprétations faites des
informations fournies, des conseils que vous en déduisez et des adaptations réalisées pour votre activité
commerciale propre. L'utilisation et l'exploitation de l'outil se fait donc sous votre seule responsabilité et à vos
risques et périls.

<h2>Définitions</h2>
<b>L'Éditeur :</b> La personne, physique ou morale, qui édite les services de communication au public en ligne.
<br/><b>Le Site :</b> L'ensemble des sites, pages Internet et services en ligne proposés par l'Éditeur.
<br/><b>L'Utilisateur :</b> La personne utilisant le Site et les services.
<h2>Nature des données collectées</h2>
<b>Dans le cadre de l'utilisation des Sites, l'Éditeur est susceptible de collecter les catégories de données
suivantes concernant ses Utilisateurs :</b>
<br/><br/>Données d'état-civil, d'identité, d'identification...
<br/><br/>Données relatives à la vie personnelle (habitudes de vie, situation familiale, hors données sensibles ou
dangereuses)
<br/><br/>Données relatives à la vie professionnelle (CV, scolarité, formation professionnelle, distinctions...)
Informations d'ordre économique et financier (revenus, situation financière, situation fiscale...)
<br/><br/>Données de connexion (adresses IP, journaux d'événements...)
<br/><br/>Données de localisation (déplacements, données GPS, GSM...)
<h2>Communication des données personnelles à des tiers</h2>
<b>Pas de communication à des tiers</b>
<br/>Vos données ne font l'objet d'aucune communication à des tiers. Vous êtes toutefois informés qu'elles
pourront être divulguées en application d'une loi, d'un règlement ou en vertu d'une décision d'une autorité
réglementaire ou judiciaire compétente.

<h2>Information préalable pour la communication des données personnelles à des tiers en
cas de fusion / absorption</h2>
<b>Information préalable et possibilité d’opt-out avant et après la fusion / acquisition</b>
<br/><br/>Dans le cas où nous prendrions part à une opération de fusion, d’acquisition ou à toute autre forme de cession
d’actifs, nous nous engageons à garantir la confidentialité de vos données personnelles et à vous informer
avant que celles-ci ne soient transférées ou soumises à de nouvelles règles de confidentialité.

<h2>Finalité de la réutilisation des données personnelles collectées</h2>
<b>Effectuer les opérations relatives à la gestion des clients concernant</b>
<br/><br/> • les contrats ; les commandes ; les livraisons ; les factures ; la comptabilité et en particulier la gestion
des comptes clients
<br/> • un programme de fidélité au sein d'une entité ou plusieurs entités juridiques ;
le suivi de la relation client tel que la réalisation d'enquêtes de satisfaction, la gestion des réclamations
et du service après-vente
<br/> • la sélection de clients pour réaliser des études, sondages et tests produits (sauf consentement des
personnes concernées recueilli dans les conditions prévues à l’article 6, ces opérations ne doivent pas
conduire à l'établissement de profils susceptibles de faire apparaître des données sensibles - origines
raciales ou ethniques, opinions philosophiques, politiques, syndicales, religieuses, vie sexuelle ou santé
des personnes)
<br/><br/><b>Effectuer des opérations relatives à la prospection</b>
<br/><br/> • la gestion d'opérations techniques de prospection (ce qui inclut notamment les opérations techniques
comme la normalisation, l'enrichissement et la déduplication)
<br/> • la sélection de personnes pour réaliser des actions de fidélisation, de prospection, de sondage, de test
produit et de promotion. Sauf consentement des personnes concernées recueilli dans les conditions
prévues à l'article 6, ces opérations ne doivent pas conduire à l'établissement de profils susceptibles de
faire apparaître des données sensibles (origines raciales ou ethniques, opinions philosophiques,
politiques, syndicales, religieuses, vie sexuelle ou santé des personnes)
<br/> • la réalisation d'opérations de sollicitations
<b>
<br/><br/>L'élaboration de statistiques commerciales
<br/><br/>La cession, la location ou l'échange de ses fichiers de clients et de ses fichiers de prospects
<br/><br/>L’actualisation de ses fichiers de prospection par l’organisme en charge de la gestion de la liste
d’opposition au démarchage téléphonique, en application des dispositions du code de la consommation
<br/><br/>L'organisation de jeux concours, de loteries ou de toute opération promotionnelle à l'exclusion des jeux
d'argent et de hasard en ligne soumis à l'agrément de l'Autorité de Régulation des Jeux en Ligne
<br/><br/>La gestion des demandes de droit d'accès, de rectification et d'opposition
<br/><br/>La gestion des impayés et du contentieux, à condition qu'elle ne porte pas sur des infractions et / ou
qu'elle n'entraîne pas une exclusion de la personne du bénéfice d'un droit, d'une prestation ou d'un
contrat
<br/><br/>La gestion des avis des personnes sur des produits, services ou contenus
</b>
<h2>Agrégation des données</h2>
<b>Agrégation avec des données non personnelles</b>
<br/>Nous pouvons publier, divulguer et utiliser les informations agrégées (informations relatives à tous nos
Utilisateurs ou à des groupes ou catégories spécifiques d'Utilisateurs que nous combinons de manière à ce
qu'un Utilisateur individuel ne puisse plus être identifié ou mentionné) et les informations non personnelles à
des fins d'analyse du secteur et du marché, de profilage démographique, à des fins promotionnelles et
publicitaires et à d'autres fins commerciales.
<br/><br/><b>Agrégation avec des données personnelles disponibles sur les comptes sociaux de l'Utilisateur</b>
<br/>Si vous connectez votre compte à un compte d’un autre service afin de faire des envois croisés, ledit service
pourra nous communiquer vos informations de profil, de connexion, ainsi que toute autre information dont
vous avez autorisé la divulgation. Nous pouvons agréger les informations relatives à tous nos autres
Utilisateurs, groupes, comptes, aux données personnelles disponibles sur l’Utilisateur.
<h2>Collecte des données d'identité</h2>
<b>Consultation libre</b>
<br/>La consultation du Site ne nécessite pas d'inscription ni d'identification préalable. Elle peut s'effectuer sans que
vous ne communiquiez de données nominatives vous concernant (nom, prénom, adresse, etc). Nous ne
procédons à aucun enregistrement de données nominatives pour la simple consultation du Site.

<h2>Collecte des données d'identification</h2>
<b>Utilisation de l'identifiant de l'utilisateur pour proposition de mise en relation et offres commerciales</b>
<br/>Nous utilisons vos identifiants électroniques pour rechercher des relations présentes par connexion, par
adresse mail ou par services. Nous pouvons utiliser vos informations de contact pour permettre à d'autres
personnes de trouver votre compte, notamment via des services tiers et des applications clientes. Vous pouvez
télécharger votre carnet d'adresses afin que nous soyons en mesure de vous aider à trouver des connaissances
sur notre réseau ou pour permettre à d'autres Utilisateurs de notre réseau de vous trouver. Nous pouvons vous
proposer des suggestions, à vous et à d'autres Utilisateurs du réseau, à partir des contacts importés de votre
carnet d’adresses. Nous sommes susceptibles de travailler en partenariat avec des sociétés qui proposent des
offres incitatives. Pour prendre en charge ce type de promotion et d'offre incitative, nous sommes susceptibles
de partager votre identifiant électronique.

<h2>Collecte des données du terminal</h2>
<b>Collecte des données de profilage et des données techniques à des fins de fourniture du service</b>
<br/>Certaines des données techniques de votre appareil sont collectées automatiquement par le Site. Ces
informations incluent notamment votre adresse IP, fournisseur d'accès à Internet, configuration matérielle,
configuration logicielle, type et langue du navigateur... La collecte de ces données est nécessaire à la fourniture
des services.
<br/><br/><b>Collecte des données techniques à des fins publicitaires, commerciales et statistiques</b>
<br/>Les données techniques de votre appareil sont automatiquement collectées et enregistrées par le Site, à des
fins publicitaires, commerciales et statistiques. Ces informations nous aident à personnaliser et à améliorer
continuellement votre expérience sur notre Site. Nous ne collectons ni ne conservons aucune donnée
nominative (nom, prénom, adresse...) éventuellement attachée à une donnée technique. Les données collectées
sont susceptibles d’être revendues à des tiers.

<h2>Cookies</h2>
<b>Durée de conservation des cookies</b>
<br/>Conformément aux recommandations de la CNIL, la durée maximale de conservation des cookies est de 13
mois au maximum après leur premier dépôt dans le terminal de l'Utilisateur, tout comme la durée de la validité
du consentement de l’Utilisateur à l’utilisation de ces cookies. La durée de vie des cookies n’est pas prolongée
à chaque visite. Le consentement de l’Utilisateur devra donc être renouvelé à l'issue de ce délai.
<br/><br/><b>Finalité cookies</b>
<br/>Les cookies peuvent être utilisés pour des fins statistiques notamment pour optimiser les services rendus à
l'Utilisateur, à partir du traitement des informations concernant la fréquence d'accès, la personnalisation des
pages ainsi que les opérations réalisées et les informations consultées.
Vous êtes informé que l'Éditeur est susceptible de déposer des cookies sur votre terminal. Le cookie enregistre
des informations relatives à la navigation sur le service (les pages que vous avez consultées, la date et l'heure
de la consultation...) que nous pourrons lire lors de vos visites ultérieures.
<br/><br/><b>Droit de l'Utilisateur de refuser les cookies</b>
<br/>Vous reconnaissez avoir été informé que l'Éditeur peut avoir recours à des cookies. Si vous ne souhaitez pas
que des cookies soient utilisés sur votre terminal, la plupart des navigateurs vous permettent de désactiver les
cookies en passant par les options de réglage.

<h2>Conservation des données techniques</h2>
<b>Durée de conservation des données techniques</b>
<br/>Les données techniques sont conservées pour la durée strictement nécessaire à la réalisation des finalités
visées ci-avant.
<h2>Délai de conservation des données personnelles et d'anonymisation</h2>
<b>Conservation des données pendant la durée de la relation contractuelle</b>
<br/>Conformément à l'article 6-5° de la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux
libertés, les données à caractère personnel faisant l'objet d'un traitement ne sont pas conservées au-delà du
temps nécessaire à l'exécution des obligations définies lors de la conclusion du contrat ou de la durée
prédéfinie de la relation contractuelle.
<br/><br/><b>Conservation des données anonymisées au delà de la relation contractuelle / après la suppression du
compte</b>
<br/>Nous conservons les données personnelles pour la durée strictement nécessaire à la réalisation des finalités
décrites dans les présentes CGU. Au-delà de cette durée, elles seront anonymisées et conservées à des fins
exclusivement statistiques et ne donneront lieu à aucune exploitation, de quelque nature que ce soit.
<br/><br/><b>Suppression des données après suppression du compte</b>
<br/>Des moyens de purge de données sont mis en place afin d'en prévoir la suppression effective dès lors que la
durée de conservation ou d'archivage nécessaire à l'accomplissement des finalités déterminées ou imposées
est atteinte. Conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux
libertés, vous disposez par ailleurs d'un droit de suppression sur vos données que vous pouvez exercer à tout
moment en prenant contact avec l'Éditeur.
<br/><br/><b>Suppression des données après 3 ans d'inactivité</b>
<br/>Pour des raisons de sécurité, si vous ne vous êtes pas authentifié sur le Site pendant une période de trois ans,
vous recevrez un e-mail vous invitant à vous connecter dans les plus brefs délais, sans quoi vos données seront
supprimées de nos bases de données.
<h2>Suppression du compte</h2>
<b>Suppression du compte à la demande</b>
<br/>L'Utilisateur a la possibilité de supprimer son Compte à tout moment, par simple demande à l'Éditeur OU par
le menu de suppression de Compte présent dans les paramètres du Compte le cas échéant.
<br/><br/><b>Suppression du compte en cas de violation des CGU</b>
<br/>En cas de violation d'une ou de plusieurs dispositions des CGU ou de tout autre document incorporé aux
présentes par référence, l'Éditeur se réserve le droit de mettre fin ou restreindre sans aucun avertissement
préalable et à sa seule discrétion, votre usage et accès aux services, à votre compte et à tous les Sites.
<h2>Indications en cas de faille de sécurité décelée par l'Éditeur</h2>
<b>Information de l'Utilisateur en cas de faille de sécurité</b>
<br/>Nous nous engageons à mettre en oeuvre toutes les mesures techniques et organisationnelles appropriées afin
de garantir un niveau de sécurité adapté au regard des risques d'accès accidentels, non autorisés ou illégaux,
de divulgation, d'altération, de perte ou encore de destruction des données personnelles vous concernant.
<br/>Dans l'éventualité où nous prendrions connaissance d'un accès illégal aux données personnelles vous
concernant stockées sur nos serveurs ou ceux de nos prestataires, ou d'un accès non autorisé ayant pour
conséquence la réalisation des risques identifiés ci-dessus, nous nous engageons à :
<br/> • Vous notifier l'incident dans les plus brefs délais ;
<br/> • Examiner les causes de l'incident et vous en informer ;
<br/> • Prendre les mesures nécessaires dans la limite du raisonnable afin d'amoindrir les effets négatifs et
préjudices pouvant résulter dudit incident

<br/><br/><b>Limitation de la responsabilité</b>
<br/>En aucun cas les engagements définis au point ci-dessus relatifs à la notification en cas de faille de sécurité ne
peuvent être assimilés à une quelconque reconnaissance de faute ou de responsabilité quant à la survenance
de l'incident en question.
<h2>Transfert des données personnelles à l'étranger</h2>
<b>Pas de transfert en dehors de l'Union européenne</b>
<br/>L'Éditeur s'engage à ne pas transférer les données personnelles de ses Utilisateurs en dehors de l'Union
européenne.

<h2>Modification des CGU et de la politique de confidentialité</h2>
<b>En cas de modification des présentes CGU, engagement de ne pas baisser le niveau de confidentialité de
manière substantielle sans l'information préalable des personnes concernées</b>
<br/>Nous nous engageons à vous informer en cas de modification substantielle des présentes CGU, et à ne pas
baisser le niveau de confidentialité de vos données de manière substantielle sans vous en informer et obtenir
votre consentement.
<h2>Droit applicable et modalités de recours</h2>
<b>Clause d'arbitrage</b>
<br/>Vous acceptez expressément que tout litige susceptible de naître du fait des présentes CGU, notamment de
son interprétation ou de son exécution, relèvera d'une procédure d'arbitrage soumise au règlement de la
plateforme d'arbitrage choisie d'un commun accord, auquel vous adhérerez sans réserve.

<h2>Portabilité des données</h2>
<b>Portabilité des données</b>
<br/>L'Éditeur s'engage à vous offrir la possibilité de vous faire restituer l'ensemble des données vous concernant
sur simple demande. L'Utilisateur se voit ainsi garantir une meilleure maîtrise de ses données, et garde la
possibilité de les réutiliser. Ces données devront être fournies dans un format ouvert et aisément réutilisable.
 
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
