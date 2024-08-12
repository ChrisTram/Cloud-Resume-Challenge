import json
import boto3

def lambda_handler(event, context):
    ses = boto3.client('ses')
    sender_email = "votreadresse@gmail.com"  # Adresse email vérifiée
    receiver_email = "votreadresse@gmail.com"  # Adresse de réception
    
    # Récupérer les données du formulaire
    name = event['name']
    email = event['email']
    message = event['message']

    # Envoyer l'email via Amazon SES
    response = ses.send_email(
        Source=sender_email,
        Destination={
            'ToAddresses': [receiver_email],
        },
        Message={
            'Subject': {
                'Data': f"New contact from {name}",
                'Charset': 'UTF-8',
            },
            'Body': {
                'Text': {
                    'Data': f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                    'Charset': 'UTF-8',
                },
            },
        },
        ReplyToAddresses=[email]  # Permet de répondre directement à l'expéditeur
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Message sent successfully!')
    }
