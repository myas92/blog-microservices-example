kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml


kubectl get service -n ingress-nginx

kubectl get ingress ingress-srv
kubectl describe ingress ingress-srv

Solution 3:
1. First kubectl get ValidatingWebhookConfiguration
2. Then kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
3. Delete that admission, and then it’s normal



https://kubernetes.github.io/ingress-nginx/deploy/



kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --watch


curl ipconfig.io/country

