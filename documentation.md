cet app est liée à strapi.

## PINCIPE

L'appi est divisée en 2 gros composant. un pour la partie barman l'autre pour la partie client.

## CÔTÉ CLIENT

L'appi permet de lister les bières et de passer une commande.
Le client dispose d'un moyen lui permettant d'afficher son QR code et de voir ce qu'il lui reste comme argent dans sa cagnote

## À FAIRE

afficher la liste des commandes côté barman et pouvoir la définir comme étant servie.
retirer l'argent de la cagnote client une fois la commande réalisée.
créer un nouvel utilisateur côté barman
permettre au barman de recharger le compte d'un client

## AUTHENTIFICATION

CÔTÉ STRAPI: user: admin, mot de passe: admin123
CÔTÉ CLIENT: user: user, mot de passe: user123
CÔTÉ BARMAN: user: barman, mot de passe: barman123

## ROUTE DISPONIBLE

http://localhost:8080/auth/local
Pour aller chercher un token lors de l'identifiaction

http://localhost:8080/products
Pour aller chercher la liste des bières côté client

http://localhost:8080/commandes
Pour poster une nouvelle commande côté client
